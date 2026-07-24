package ticket.booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @JsonProperty("userId")
    private String userId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("password")
    private String password;

    @JsonProperty("hashedPassword")
    private String hashedPassword;

    @JsonProperty("ticketsBooked")
    private List<Ticket> ticketsBooked;
}
