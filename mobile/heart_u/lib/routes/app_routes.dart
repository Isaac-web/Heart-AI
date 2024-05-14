import 'package:flutter/cupertino.dart';
import 'package:heart_u/views/appointments/appointments_page.dart';
import 'package:heart_u/views/auth/register_view.dart';
import 'package:heart_u/views/chatbot/bot_home_screen/bot_home_screen.dart';
import 'package:heart_u/views/chatbot/bot_home_screen/chat_view.dart';
import 'package:heart_u/views/doctorDashboard/doctor_dashboard.dart';
import 'package:heart_u/views/patientDashboard/patient_dashboard.dart';
import 'package:heart_u/views/profile/page/profile_page.dart';
import '../views/auth/login_view.dart';
import '../views/onboarding/onboarding_screen.dart';
import '../views/patientDashboard/home_page.dart';

class AppRoutes {
  // static const String mobileScreen = '/mobile_screen';
  //
  static const String chatList = '/chat_list_screen';

  static const String appointments = '/appointments_screen';

  static const String profile = '/profile_screen';

  static const String register = '/register_screen';
  //
  static const String login = '/login_screen';

  static const String detail = '/detail_screen';
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
    profile: (context) => ProfilePage(),
    chatList: (context) => ChatScreen(),
    chatScreen: (context) => const BotHomeScreen(),
    login: (context) => const LoginScreen(),
    appointments: (context) => AppointmentsPage(),
    register: (context) => const RegisterUserScreen(),
    patientDashboardScreen: (context) => HomePage(),
    // appNavigationScreen: (context) => AppNavigationScreen(),
    initialRoute: (context) =>  const OnboardingScreen(),
    doctorDashboardScreen: (context) => const DoctorDashboard(),
  };
}