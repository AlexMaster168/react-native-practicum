import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import "react-native-gesture-handler";
import { accent } from "../../core/colors";

import { Platform } from "react-native";

import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  useColorScheme,
} from "react-native";

import SettingsTabNavigator from "../SettingsTabNavigator";
import { TabsNavigator } from "../TabsNavigator";
import { useSelector, useDispatch } from "react-redux";
import { AboutAppScreen } from "../../screens";
import moment from "moment";
import {
  setRecomendtationRest,
  setReminders,
} from "../../redux/reducers/directoryReducer";
import { getValueIfNotZero } from "../../utils/timeValues";

import { useColorTheme } from "../../hooks/useTheme";
import ChildrenNavigator from "../ChildrenNavigator";
import RecommendationsNavigator from "../RecommendationsNavigator";
import RemindersNavigator from "../RemindersNavigator";
import CalculatorNavigation from "../CalculatorNavigation";
import ReservationNavigator from "../ReservationNavigator";
import AboutAppNavigator from "../AboutAppNavigator";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const dispatch = useDispatch();
  const theme = useColorTheme();
  const languages = useSelector(({ app }) => app.languages);
  const child = useSelector(({ child }) => child.activeChild);
  const reminders = useSelector(({ directory }) => directory.reminders);

  const date = () => {
    // counts child age
    const diff = moment(moment().diff(child.date));
    let yy = diff.year() - 1970;
    let mm = diff.month();
    let dd = diff.date();

    return (
      <View>
        <Text
          style={{ color: theme.text, marginTop: 10 }}
        >{`${child.name}`}</Text>
        <Text style={{ color: theme.text, opacity: 0.6 }}>
          {getValueIfNotZero(yy, languages.years, true)}
          {getValueIfNotZero(mm, languages.month, true)}
          {getValueIfNotZero(dd, languages.days)}
        </Text>
      </View>
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView>
            <DrawerItem
              labelStyle={{ color: theme.text }}
              label={date}
            ></DrawerItem>

            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={{
        unmountOnBlur: true,
        drawerLabelStyle: {
          color: theme.text,
        },

        drawerStyle: {
          backgroundColor: theme.navigator,
          marginTop: 25,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          ...Platform.select({
            ios: {
              height: "100%",
              marginTop: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
            android: {
              height: "93%",
            },
          }),
          // height: "93%",
          width: "80%",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabsNavigator}
        options={{
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/bed.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.main}
                </Text>
              </View>
            );
          },

          drawerItemStyle: {
            borderColor: theme.navigator,
            borderBottomWidth: 1,
            borderTopWidth: 1,
          },
          headerShown: false,
          title: languages.main,
        }}
      />
      <Drawer.Screen
        name="Recommendations"
        component={RecommendationsNavigator}
        options={{
          headerShown: false,
          headerTintColor: theme.text,
          title: languages.sleep_standart,
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/ic_indicators.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.sleep_standart}
                </Text>
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Children"
        component={ChildrenNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/ic_boy.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.babys}
                </Text>
              </View>
            );
          },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          // title: languages.babys,
        }}
      />
      <Drawer.Screen
        name="Reminders"
        component={RemindersNavigator}
        options={{
          headerShown: false,

          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/ringing.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.reminders}
                </Text>
              </View>
            );
          },
          title: languages.reminders,
        }}
      />
      <Drawer.Screen
        name="Calculator"
        component={CalculatorNavigation}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/keys.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.calculator}
                </Text>
              </View>
            );
          },
          title: languages.calculator,
        }}
      />
      <Drawer.Screen
        name="Reservation"
        component={ReservationNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/ic_cloud.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.reservation}
                </Text>
              </View>
            );
          },
          title: languages.reservation,
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/ic_settings.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.settings}
                </Text>
              </View>
            );
          },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
        }}
      />
      <Drawer.Screen
        name="AboutApp"
        component={AboutAppNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => {
            let iconStyle = focused
              ? styles.tabBarIconFocused
              : styles.tabBarIconUnFocused;
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{
                    ...styles.tabBarIcon,
                    ...iconStyle,
                    ...styles.iconMarginRight,
                  }}
                  source={require("../../images/icons/ic_help.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.text,
                  }}
                >
                  {languages.about_app}
                </Text>
              </View>
            );
          },
          title: languages.about_app,
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = {
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  tabBarIconFocused: {
    opacity: 1,
    tintColor: accent,
  },
  tabBarIconUnFocused: {
    opacity: 0.5,
    tintColor: "#6e668a",
  },
  editorText: {
    fontSize: 13,
    color: "#fff",
    marginRight: 15,
    textTransform: "uppercase",
  },
  shareImage: { width: 26, height: 26 },
  addImage: {
    width: 22,
    height: 22,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 15,
  },

  modalContent: {
    borderRadius: 3,
    backgroundColor: "#fff",
    padding: 15,
  },
  modalContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    height: "90%",
    borderRadius: 20,
  },

  listOfShareContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 3,
  },

  itemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },

  iconMarginRight: {
    marginRight: 15,
  },

  headerText: {
    fontSize: 25,
  },

  itemOfShare: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },

  itemOfShareText: {
    fontSize: 20,
  },

  shareButton: {
    color: "#fff",
    backgroundColor: accent,
    borderRadius: 4,
    marginVertical: 5,
  },
  changeChildBtn: {
    marginRight: 160,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    height: 40,
    fontSize: 20,
  },

  changeChildBtnText: {
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    alignItems: "center",
  },

  listOfChildrenContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: accent,
    borderWidth: 1,
  },
  modalIconClose: {
    width: 30,
    height: 30,
    tintColor: accent,
  },
  childName: {
    margin: 10,
  },

  childNameText: {
    fontSize: 18,
  },
};
