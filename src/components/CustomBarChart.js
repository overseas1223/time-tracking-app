import { Dimensions } from "react-native";

import { BarChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper/src/core/theming";

const CustomBarChart = ({ data }) => {
  const theme = useTheme();
  return (
    <BarChart
      data={data}
      width={Dimensions.get("window").width - 40}
      height={300}
      fromZero={true}
      verticalLabelRotation={-45}
      chartConfig={{
        backgroundColor: theme.colors.background,
        backgroundGradientFrom: theme.colors.background,
        backgroundGradientTo: theme.colors.background,
        decimalPlaces: 2,
        color: (opacity = 1) =>
          theme.dark
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
          padding: 10,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default CustomBarChart;
