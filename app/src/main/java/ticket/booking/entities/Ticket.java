package ticket.booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Ticket {

    @JsonProperty("ticketId")
    private String ticketId;

    @JsonProperty("userId")
    private String userId;

    @JsonProperty("source")
    private String source;

    @JsonProperty("destination")
    private String destination;

    @JsonProperty("dateOfTravel")
    private String dateOfTravel;

    @JsonProperty("train")
    private Train train;

    public String getTicketInfo() {
        return "Ticket ID: " + ticketId +
               "\nSource: " + source +
               "\nDestination: " + destination +
               "\nDate of Travel: " + dateOfTravel +
               "\nTrain: " + (train != null ? train.getTrainInfo() : "N/A");
    }
}
