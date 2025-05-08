package banky.webservices.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Custom JSON serializer for BigDecimal values with 2 decimal precision.
 * Converts a BigDecimal value (e.g., 100.262) into a string representation
 * after multiplying by 100 and removing the decimal point (e.g., "10026").
 * 
 * This format preserves fractional values without using floating point
 * in the serialized representation.
 */
public class TwoDecimalToStringSerializer extends JsonSerializer<BigDecimal> {

    @Override
    public void serialize(BigDecimal value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (value == null) {
            gen.writeNull();
            return;
        }
        
        gen.writeString(convertToString(value));
    }
    
    /**
     * Converts a BigDecimal with 2 decimal places to a string representation by
     * multiplying by 1000 and removing the decimal point.
     * 
     * @param value BigDecimal to convert (e.g., 100.26)
     * @return String value multiplied by 100 with no decimal point (e.g., "10026")
     */
    public static String convertToString(BigDecimal value) {
        if (value == null) {
            return null;
        }
        
        // Scale to 2 decimal places and multiply by 1000
        BigDecimal scaledValue = value.setScale(2, RoundingMode.HALF_UP)
            .multiply(BigDecimal.valueOf(100));
        
        // Convert to string without decimal point (intValue)
        return scaledValue.toBigInteger().toString();
    }
}
