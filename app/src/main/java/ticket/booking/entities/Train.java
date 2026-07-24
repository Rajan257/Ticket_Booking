package ticket.booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class Train {

    @JsonProperty("trainId")
    private String trainId;

    @JsonProperty("trainNo")
    private String trainNo;

    @JsonProperty("seats")
    private List<List<Integer>> seats;

    @JsonProperty("stationTimes")
    private Map<String, String> stationTimes;

    @JsonProperty("stations")
    private List<String> stations;

    public String getTrainInfo() {
        return "Train No: " + trainNo + " | Train ID: " + trainId + " | Stations: " + String.join(" -> ", stations);
    }
}
