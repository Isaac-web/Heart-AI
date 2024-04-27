import 'package:flutter/cupertino.dart';
import 'package:heart_u/views/chatbot/bot_home_screen/bot_home_screen.dart';
import 'package:heart_u/views/chatbot/bot_home_screen/chat_view.dart';
import 'package:heart_u/views/doctorDashboard/doctor_dashboard.dart';
import 'package:heart_u/views/patientDashboard/patient_dashboard.dart';

import '../views/login/login_view.dart';
import '../views/onboarding/onboarding_view.dart';

class AppRoutes {
  // static const String mobileScreen = '/mobile_screen';
  //
  static const String chatList = '/chat_list_screen';

  //
  static const String registerScreen = '/register_screen';
  //
  static const String chatScreen = '/chat_screen';

  static const String patientDashboardScreen = '/patient_dashboard_screen';
  //
  static const String doctorDashboardScreen = '/doctor_dashboard_screen';

  // static const String appNavigationScreen = '/app_navigation_screen';

  static const String initialRoute = '/initialRoute';

  static Map<String, WidgetBuilder> routes = {
    // mobileScreen: (context) => MobileScreen(),
    // onboardingScreen: (context) => OnboardingScreen(),
    chatList: (context) => const ChatScreen(),
    chatScreen: (context) => const BotHomeScreen(),
    registerScreen: (context) => RegisterScreen(),
    patientDashboardScreen: (context) => PatientDashboard(),
    // appNavigationScreen: (context) => AppNavigationScreen(),
    initialRoute: (context) => const OnboardingScreen(),
    doctorDashboardScreen: (context) => DoctorDashboard(),
  };
}