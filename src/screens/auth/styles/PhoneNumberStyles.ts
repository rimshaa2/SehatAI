import { StyleSheet } from "react-native";
import colors from "../../../config/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scroll: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 10,
  },

  statusWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 12,
  },

  timeText: {
    color: colors.darkBlue,
    fontSize: 15,
  },

  statusIcons: {
    width: 66,
    height: 11,
  },

  topNavRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  navIcon: {
    width: 24,
    height: 24,
  },

  titleWrapper: {
    marginLeft: 16,
    marginBottom: 32,
  },

  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: colors.gray,
    fontSize: 14,
    width: 280,
    marginTop: 6,
  },

  inputWrapper: {
    marginHorizontal: 16,
    marginBottom: 40,
  },

  label: {
    color: colors.black,
    fontSize: 14,
    marginBottom: 8,
  },

  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },

  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginRight: 12,
  },

  flagIcon: {
    width: 20,
    height: 16,
    marginRight: 4,
  },

  countryCode: {
    color: colors.darkBlue,
    fontSize: 16,
    marginRight: 7,
  },

  dropIcon: {
    width: 14,
    height: 14,
  },

  phoneInput: {
    flex: 1,
    fontSize: 14,
    color: "#71717A",
    paddingVertical: 12,
    marginRight: 10,
  },

  continueBtn: {
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 24,
  },

  continueText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
