import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/views/onboarding/widget/animated_btn.dart';
import 'package:heart_u/views/onboarding/widget/custom_sign_in.dart';
import 'package:rive/rive.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../routes/app_routes.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  bool isSignInDialogShown = false;
  bool isRegisterDialogShown = false;
  late RiveAnimationController _btnAnimationController;

  Future<void> checkLoggedIn() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool? stat = prefs.getBool("isLoggedIn");
    print(stat.toString());
    if (stat == true){
      Navigator.of(context).pushNamedAndRemoveUntil(
          AppRoutes.patientDashboardScreen, (route) => false);
    }
  }

  @override
  void initState() {
    checkLoggedIn();
    _btnAnimationController = OneShotAnimation("active", autoplay: false);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Stack(
          children: [
            Positioned(
                width: MediaQuery.of(context).size.width * 1.7,
                bottom: 200,
                left: 100,
                child: Image.asset('assets/Backgrounds/Spline.png')),
            Positioned.fill(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 20, sigmaY: 10),
                )),
            const RiveAnimation.asset('assets/RiveAssets/shapes.riv'),
            Positioned.fill(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 20, sigmaY: 10),
                  child: const SizedBox(),
                )),
            AnimatedPositioned(
              duration: const Duration(milliseconds: 240),
              top: isSignInDialogShown ? -50 : isRegisterDialogShown ? -50 : 0,
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Spacer(),
                        const SizedBox(
                          width: 260,
                          child: Column(children: [
                            Text(
                              "HeartAI",
                              style: TextStyle(
                                  fontSize: 60, fontFamily: "Poppins", height: 1.2),
                            ),
                            SizedBox(
                              height: 16,
                            ),
                            Text(
                                "Learn more about your health results by "
                                    "interacting with "
                                    "artificial intelligence"),
                            SizedBox(
                              height: 16,
                            ),
                            Text(
                                "Gain insights into your vitals with our "
                                    "AI-powered assistant"),
                            SizedBox(
                              height: 16,
                            ),
                            Text(
                                "Receive report from expert doctors on the go"),
                          ]),
                        ),
                        const Spacer(
                          flex: 2,
                        ),
                        AnimatedBtn(
                          btnAnimationController: _btnAnimationController,
                          press: () {
                            _btnAnimationController.isActive = true;
                            Future.delayed(Duration(milliseconds: 800), () {
                              setState(() {
                                isSignInDialogShown = true;
                              });
                              customSigninDialog(context, onClosed: (_) {
                                setState(() {
                                  isSignInDialogShown = false;
                                });
                              });
                            });
                          },
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 24.0),
                          child: TextButton(
                            onPressed: (){
                              Navigator.of(context).pushNamed(
                                  AppRoutes.register);
                            },
                            child: const Text(
                              "Don't have an account? create one here"
                            ),
                          ),
                        ),
                        const Padding(
                          padding: EdgeInsets.only(bottom: 24.0),
                          child: Text(
                            "Get personalized heart health analysis and guidance from accredited doctors backed by AI",
                            style: TextStyle(),
                          ),
                        )
                      ]),
                ),
              ),
            )
          ],
        ));
  }
}