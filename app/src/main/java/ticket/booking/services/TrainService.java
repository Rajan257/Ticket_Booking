package ticket.booking.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import ticket.booking.entities.Train;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class TrainService {

    private List<Train> trainList;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String TRAIN_DB_PATH_1 = "app/src/main/java/ticket/booking/localdb/train.json";
    private static final String TRAIN_DB_PATH_2 = "src/main/java/ticket/booking/localdb/train.json";
    
    private String getValidPath() {
        if (new File(TRAIN_DB_PATH_1).exists()) return TRAIN_DB_PATH_1;
        return TRAIN_DB_PATH_2;
    }

    public TrainService() throws IOException {
        File trains = new File(getValidPath());
        if (trains.exists()) {
            trainList = objectMapper.readValue(trains, new TypeReference<List<Train>>() {});
        } else {
            System.out.println("Warning: train.json not found.");
            trainList = List.of();
        }
    }

    public List<Train> searchTrains(String source, String destination) {
        return trainList.stream()
                .filter(train -> isValidTrain(train, source, destination))
                .collect(Collectors.toList());
    }

    public void addTrain(Train newTrain) throws IOException {
        Optional<Train> existingTrain = trainList.stream()
                .filter(t -> t.getTrainNo().equals(newTrain.getTrainNo()))
                .findFirst();
        if (existingTrain.isPresent()) {
            System.out.println("Train already exists. Updating...");
            updateTrain(newTrain);
        } else {
            trainList.add(newTrain);
            saveTrainListToFile();
        }
    }

    public void updateTrain(Train updatedTrain) throws IOException {
        OptionalInt indexOpt = IntStream.range(0, trainList.size())
                .filter(i -> trainList.get(i).getTrainNo().equals(updatedTrain.getTrainNo()))
                .findFirst();
        if (indexOpt.isPresent()) {
            trainList.set(indexOpt.getAsInt(), updatedTrain);
            saveTrainListToFile();
            System.out.println("Train updated successfully.");
        } else {
            System.out.println("Train not found.");
        }
    }

    private void saveTrainListToFile() throws IOException {
        objectMapper.writeValue(new File(getValidPath()), trainList);
    }

    private boolean isValidTrain(Train train, String source, String destination) {
        List<String> stations = train.getStations();
        if (stations == null) return false;
        int sourceIndex = stations.indexOf(source);
        int destIndex = stations.indexOf(destination);
        return sourceIndex != -1 && destIndex != -1 && sourceIndex < destIndex;
    }
}
