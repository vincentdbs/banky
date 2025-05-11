package banky.webservices.serializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Custom JSON deserializer for BigDecimal values with 2 decimal precision.
 * Converts a string value representing an integer multiplied by 100 (e.g., "10036")
 * back into a BigDecimal with proper decimal places (e.g., 100.36).
 * 
 * This is the counterpart to ThreeDecimalToStringSerializer.
 */
public class TwoDecimalDeserializer extends JsonDeserializer<BigDecimal> {

    @Override
    public BigDecimal deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String valueAsString = p.getValueAsString();
        if (valueAsString == null || valueAsString.isEmpty()) {
            return null;
        }
        
        return convertFromString(valueAsString);
    }
    
    /**
     * Converts a string representation (with no decimal point) back to a BigDecimal with 2 decimal places
     * by dividing by 1000.
     * 
     * @param value String value to convert (e.g., "10036")
     * @return BigDecimal value with proper decimal places (e.g., 100.36)
     */
    public static BigDecimal convertFromString(String value) {
        if (value == null) {
            return null;
        }
        
        // Parse the string as a BigDecimal with no decimal point
        BigDecimal integerValue = new BigDecimal(value);
        
        // Divide by 1000 to get the 3 decimal places
        return integerValue.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}