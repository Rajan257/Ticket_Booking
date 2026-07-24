package ticket.booking;

import ticket.booking.entities.Train;
import ticket.booking.entities.User;
import ticket.booking.services.TrainService;
import ticket.booking.services.UserBookingService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;

public class App {

    public static void main(String[] args) {

        System.out.println("     Welcome to IRCTC Train Booking CLI    ");


        Scanner scanner = new Scanner(System.in);
        int option = 0;
        UserBookingService userBookingService;
        TrainService trainService;

        try {
            userBookingService = new UserBookingService();
            trainService = new TrainService();
        } catch (IOException ex) {
            System.out.println("Error initializing services. Please check data files.");
            return;
        }

        while (option != 7) {
            System.out.println("\n--- Main Menu ---");
            System.out.println("1. Sign Up");
            System.out.println("2. Login");
            System.out.println("3. Fetch Bookings");
            System.out.println("4. Search Trains");
            System.out.println("5. Book a Seat");
            System.out.println("6. Cancel my Booking");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");

            try {
                option = Integer.parseInt(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                continue;
            }

            switch (option) {
                case 1 -> handleSignUp(scanner, userBookingService);
                case 2 -> {
                    UserBookingService loggedIn = handleLogin(scanner);
                    if (loggedIn != null) userBookingService = loggedIn;
                }
                case 3 -> userBookingService.fetchBookings();
                case 4 -> handleSearchTrains(scanner, trainService);
                case 5 -> handleBookTicket(scanner, userBookingService, trainService);
                case 6 -> handleCancelTicket(scanner, userBookingService);
                case 7 -> System.out.println("Thank you for using IRCTC. Goodbye!");
                default -> System.out.println("Invalid option. Please choose between 1 and 7.");
            }
        }

        scanner.close();
    }

    private static void handleSignUp(Scanner scanner, UserBookingService service) {
        System.out.print("Enter your name: ");
        String name = scanner.nextLine().trim();
        System.out.print("Enter your password: ");
        String password = scanner.nextLine().trim();

        User newUser = User.builder()
                .userId(UUID.randomUUID().toString())
                .name(name)
                .password(password)
                .ticketsBooked(new ArrayList<>())
                .build();

        service.signUp(newUser);
    }

    private static UserBookingService handleLogin(Scanner scanner) {
        System.out.print("Enter your name: ");
        String name = scanner.nextLine().trim();
        System.out.print("Enter your password: ");
        String password = scanner.nextLine().trim();

        User loginUser = User.builder()
                .name(name)
                .password(password)
                .build();

        try {
            UserBookingService loggedInService = new UserBookingService(loginUser);
            if (loggedInService.loginUser()) {
                System.out.println("You are now logged in as: " + name);
                return loggedInService;
            }
        } catch (IOException e) {
            System.out.println("Error during login. Please try again.");
        }
        return null;
    }

    private static void handleSearchTrains(Scanner scanner, TrainService trainService) {
        System.out.print("Enter source station: ");
        String source = scanner.nextLine().trim();
        System.out.print("Enter destination station: ");
        String destination = scanner.nextLine().trim();

        List<Train> trains = trainService.searchTrains(source, destination);
        if (trains.isEmpty()) {
            System.out.println("No trains found for the given route.");
        } else {
            System.out.println("Available trains:");
            for (int i = 0; i < trains.size(); i++) {
                System.out.println((i + 1) + ". " + trains.get(i).getTrainInfo());
            }
        }
    }

    private static void handleBookTicket(Scanner scanner, UserBookingService userService, TrainService trainService) {
        System.out.print("Enter source station: ");
        String source = scanner.nextLine().trim();
        System.out.print("Enter destination station: ");
        String destination = scanner.nextLine().trim();

        List<Train> trains = trainService.searchTrains(source, destination);
        if (trains.isEmpty()) {
            System.out.println("No trains available for this route.");
            return;
        }

        System.out.println("Available trains:");
        for (int i = 0; i < trains.size(); i++) {
            System.out.println((i + 1) + ". " + trains.get(i).getTrainInfo());
        }
        System.out.print("Select train number (1-" + trains.size() + "): ");

        int trainChoice;
        try {
            trainChoice = Integer.parseInt(scanner.nextLine().trim()) - 1;
            if (trainChoice < 0 || trainChoice >= trains.size()) {
                System.out.println("Invalid train selection.");
                return;
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid input.");
            return;
        }

        Train selectedTrain = trains.get(trainChoice);
        List<List<Integer>> seats = selectedTrain.getSeats();

        System.out.println("Seat availability (0 = Available, 1 = Booked):");
        for (int i = 0; i < seats.size(); i++) {
            System.out.print("Row " + (i + 1) + ": ");
            for (int j = 0; j < seats.get(i).size(); j++) {
                System.out.print("[" + (j + 1) + ":" + seats.get(i).get(j) + "] ");
            }
            System.out.println();
        }

        System.out.print("Enter row number for your seat: ");
        int row;
        try {
            row = Integer.parseInt(scanner.nextLine().trim()) - 1;
        } catch (NumberFormatException e) {
            System.out.println("Invalid row input.");
            return;
        }
        System.out.print("Enter column number for your seat: ");
        int col;
        try {
            col = Integer.parseInt(scanner.nextLine().trim()) - 1;
        } catch (NumberFormatException e) {
            System.out.println("Invalid column input.");
            return;
        }

        List<Integer> seatChoice = new ArrayList<>();
        seatChoice.add(row);
        seatChoice.add(col);
        List<List<Integer>> selectedSeats = new ArrayList<>();
        selectedSeats.add(seatChoice);

        try {
            userService.bookTicket(selectedTrain, source, destination, selectedSeats);
        } catch (IOException e) {
            System.out.println("Error booking ticket. Please try again.");
        }
    }

    private static void handleCancelTicket(Scanner scanner, UserBookingService userService) {
        userService.fetchBookings();
        System.out.print("Enter the Ticket ID to cancel: ");
        String ticketId = scanner.nextLine().trim();
        try {
            userService.cancelTicket(ticketId);
        } catch (IOException e) {
            System.out.println("Error cancelling ticket. Please try again.");
        }
    }
}
