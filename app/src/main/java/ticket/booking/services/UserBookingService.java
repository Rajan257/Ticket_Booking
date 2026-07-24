package ticket.booking.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import ticket.booking.entities.Ticket;
import ticket.booking.entities.Train;
import ticket.booking.entities.User;
import ticket.booking.util.UserServiceUtil;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class UserBookingService {

    private User user;
    private List<User> userList;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String USERS_PATH_1 = "app/src/main/java/ticket/booking/localdb/users.json";
    private static final String USERS_PATH_2 = "src/main/java/ticket/booking/localdb/users.json";

    private String getValidPath() {
        if (new File(USERS_PATH_1).exists()) return USERS_PATH_1;
        if (new File(USERS_PATH_2).exists()) return USERS_PATH_2;
        return USERS_PATH_1; // fallback
    }

    public UserBookingService() throws IOException {
        loadUserListFromFile();
    }

    public UserBookingService(User user) throws IOException {
        this.user = user;
        loadUserListFromFile();
    }

    private void loadUserListFromFile() throws IOException {
        File usersFile = new File(getValidPath());
        if (usersFile.exists()) {
            userList = objectMapper.readValue(usersFile, new TypeReference<List<User>>() {});
        } else {
            userList = new ArrayList<>();
        }
    }

    public boolean signUp(User newUser) {
        Optional<User> existing = userList.stream()
                .filter(u -> u.getName().equalsIgnoreCase(newUser.getName()))
                .findFirst();
        if (existing.isPresent()) {
            System.out.println("User already exists with this name.");
            return false;
        }
        newUser.setUserId(UUID.randomUUID().toString());
        newUser.setHashedPassword(UserServiceUtil.hashPassword(newUser.getPassword()));
        newUser.setPassword(null);
        newUser.setTicketsBooked(new ArrayList<>());
        userList.add(newUser);
        try {
            saveUserListToFile();
            System.out.println("Sign up successful!");
            return true;
        } catch (IOException e) {
            System.out.println("Error saving user data.");
            return false;
        }
    }

    public boolean loginUser() {
        Optional<User> foundUser = userList.stream()
                .filter(u -> u.getName().equalsIgnoreCase(user.getName())
                        && UserServiceUtil.checkPassword(user.getPassword(), u.getHashedPassword()))
                .findFirst();
        if (foundUser.isPresent()) {
            this.user = foundUser.get();
            System.out.println("Login successful! Welcome, " + user.getName());
            return true;
        }
        System.out.println("Invalid credentials.");
        return false;
    }

    public void fetchBookings() {
        if (user == null) {
            System.out.println("Please login first.");
            return;
        }
        List<Ticket> tickets = user.getTicketsBooked();
        if (tickets == null || tickets.isEmpty()) {
            System.out.println("No bookings found.");
            return;
        }
        System.out.println("Your bookings:");
        tickets.forEach(t -> System.out.println(t.getTicketInfo()));
    }

    public boolean bookTicket(Train train, String source, String destination, List<List<Integer>> selectedSeats) throws IOException {
        if (user == null) {
            System.out.println("Please login first.");
            return false;
        }

        Optional<Train> availableTrain = Optional.of(train);
        if (availableTrain.isEmpty()) {
            System.out.println("Train not found.");
            return false;
        }

        Train selectedTrain = availableTrain.get();
        List<List<Integer>> seats = selectedTrain.getSeats();

        boolean seatsAvailable = selectedSeats.stream().allMatch(seat -> {
            int row = seat.get(0);
            int col = seat.get(1);
            return row >= 0 && row < seats.size()
                    && col >= 0 && col < seats.get(row).size()
                    && seats.get(row).get(col) == 0;
        });

        if (!seatsAvailable) {
            System.out.println("One or more selected seats are already booked.");
            return false;
        }

        selectedSeats.forEach(seat -> {
            int row = seat.get(0);
            int col = seat.get(1);
            seats.get(row).set(col, 1);
        });

        TrainService trainService = new TrainService();
        trainService.updateTrain(selectedTrain);

        Ticket ticket = Ticket.builder()
                .ticketId(UUID.randomUUID().toString())
                .userId(user.getUserId())
                .source(source)
                .destination(destination)
                .dateOfTravel(java.time.LocalDateTime.now().toString())
                .train(selectedTrain)
                .build();

        if (user.getTicketsBooked() == null) {
            user.setTicketsBooked(new ArrayList<>());
        }
        user.getTicketsBooked().add(ticket);

        userList.replaceAll(u -> u.getUserId().equals(user.getUserId()) ? user : u);
        saveUserListToFile();
        System.out.println("Ticket booked successfully!");
        System.out.println(ticket.getTicketInfo());
        return true;
    }

    public boolean cancelTicket(String ticketId) throws IOException {
        if (user == null) {
            System.out.println("Please login first.");
            return false;
        }
        List<Ticket> tickets = user.getTicketsBooked();
        if (tickets == null || tickets.isEmpty()) {
            System.out.println("No bookings to cancel.");
            return false;
        }
        Optional<Ticket> ticketToCancel = tickets.stream()
                .filter(t -> t.getTicketId().equals(ticketId))
                .findFirst();
        if (ticketToCancel.isEmpty()) {
            System.out.println("Ticket not found.");
            return false;
        }
        Ticket ticket = ticketToCancel.get();
        Train train = ticket.getTrain();
        if (train != null) {
            TrainService trainService = new TrainService();
            trainService.updateTrain(train);
        }
        tickets.remove(ticket);
        userList.replaceAll(u -> u.getUserId().equals(user.getUserId()) ? user : u);
        saveUserListToFile();
        System.out.println("Ticket cancelled successfully.");
        return true;
    }

    private void saveUserListToFile() throws IOException {
        objectMapper.writeValue(new File(getValidPath()), userList);
    }

    public User getUser() {
        return user;
    }
}
