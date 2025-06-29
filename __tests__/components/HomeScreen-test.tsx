import HomeScreen from "@/app/(tabs)/home";
import { useUserData } from "@/hooks/user/useUserData";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { render, waitFor } from "@testing-library/react-native";

const Tab = createBottomTabNavigator();

function HomeScreenWrapper() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

describe("HomeScreen", () => {
  it("Starting with userData = null, return loading text", () => {
    // 👇 override the mock's return value
    (useUserData as jest.Mock).mockReturnValue({
      userData: null, // <- the loading condition
    });

    const screen = render(<HomeScreenWrapper />);

    screen.getByText("Loading...");
  });

  it("Starting with userData, return name Manny", async () => {
    // 👇 override the mock's return value
    (useUserData as jest.Mock).mockReturnValue({
      userData: {
        name: "Manny",
      }, // <- the loading condition
    });

    const screen = render(<HomeScreenWrapper />);

    waitFor(() => {
      screen.getByText("Welcome, Manny!");
    });
  });
});
