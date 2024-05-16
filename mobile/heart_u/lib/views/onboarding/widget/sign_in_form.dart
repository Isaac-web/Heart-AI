import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:rive/rive.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../core/utils/constants.dart';
import '../../../routes/app_routes.dart';
import 'custom_input.dart';

class SignInForm extends StatefulWidget {
  const SignInForm({
    super.key,
  });

  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool isShowLoading = false;
  bool isShowConfetti = false;

  late SMITrigger check;
  late SMITrigger error;
  late SMITrigger reset;

  late SMITrigger confetti;

  final Dio dio = Dio();

  var jsonList;

  StateMachineController getRiveController(Artboard artboard) {
    StateMachineController? controller =
    StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    return controller;
  }

  Future<void> signIn(BuildContext context) async {
    setState(() {
      isShowLoading = true;
      isShowConfetti = true;
    });

    SharedPreferences prefs = await SharedPreferences.getInstance();

    String email = emailController.text;
    String password = passwordController.text;

    Future.delayed(Duration(seconds: 1), () async {
      if (email.isNotEmpty || password.isNotEmpty) {

        print("dio initialised");

        try{

          print("login initialised");
          Response response = await dio.post(
            "${baseUrl}api/users/login",
            data: {
              "email" : email,
              "password": password,
            },
            options: Options(
              responseType: ResponseType.json,
              validateStatus: (_) => true,
            ),
          );

          print('Response: ${response.data}');

          final jsonData = response.data;
          final token = jsonData['token'];
          final sex = jsonData["data"]["sex"];
          final userId = jsonData["data"]["_id"];
          final name = jsonData["data"]["name"];
          final phone = jsonData["data"]["phone"];
          final age = jsonData["data"]["age"];

          print("Message is $token");

          prefs.setString('token', token);
          prefs.setString('email', email);
          prefs.setString("password", password);
          prefs.setString("sex", sex.toString());
          prefs.setString("userId", userId);
          prefs.setString("name", name);
          prefs.setString("phone", phone.toString());
          prefs.setString("age", age.toString());

          if (response.statusCode == 200){

            prefs.setBool("isLoggedIn", true);
            // show success
            check.fire();
            Future.delayed(Duration(seconds: 2), () {
              setState(() {
                isShowLoading = false;
              });
              confetti.fire();
            });

            Future.delayed(Duration(seconds: 3), (){
              Navigator.of(context).pushNamedAndRemoveUntil(
                  AppRoutes.patientDashboardScreen, (route) => false);
            });

          }else {

            error.fire();
            Future.delayed(Duration(seconds: 2), () {
              setState(() {
                isShowLoading = false;
              });
            });

            AwesomeDialog(
              context: context,
              dialogType: DialogType.error,
              animType: AnimType.rightSlide,
              headerAnimationLoop: true,
              title: 'Error',
              desc:
              'Check details and try again',
              btnOkOnPress: () {},
              btnOkIcon: Icons.cancel,
              btnOkColor: Colors.red,
            ).show();
          }

        } catch (e){

          error.fire();
          Future.delayed(Duration(seconds: 2), () {
            setState(() {
              isShowLoading = false;
            });
          });

          Future.delayed(Duration(seconds: 3),(){
            AwesomeDialog(
              context: context,
              dialogType: DialogType.error,
              animType: AnimType.rightSlide,
              headerAnimationLoop: true,
              title: 'Error',
              desc: "An error occurred, please try again later",
              btnOkOnPress: () {},
              btnOkIcon: Icons.cancel,
              btnOkColor: Colors.red,
            ).show();
          });

          print(e.toString());
        }


      } else {
        error.fire();
        Future.delayed(Duration(seconds: 2), () {
          setState(() {
            isShowLoading = false;
          });
        });

        Future.delayed(Duration(seconds: 3),(){
          AwesomeDialog(
            context: context,
            dialogType: DialogType.warning,
            headerAnimationLoop: true,
            animType: AnimType.bottomSlide,
            title: 'Enter credentials',
            desc: 'Enter your details to access HeartAi',
            buttonsTextStyle: const TextStyle(color: Colors.black),
            showCloseIcon: true,
            btnOkOnPress: () {},
          ).show();
        });



      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // const Text(
                //   "Email",
                //   style: TextStyle(
                //     color: CupertinoColors.black
                //   ),
                // ),
                // Padding(
                //   padding: const EdgeInsets.only(top: 8.0, bottom: 16),
                //   child: TextFormField(
                //     validator: (value) {
                //       if (value!.isEmpty) {
                //         return "";
                //       }
                //       return null;
                //     },
                //     controller: emailController,
                //     onSaved: (email) {},
                //     style: const TextStyle(
                //         color: CupertinoColors.black
                //     ),
                //     decoration: InputDecoration(
                //         prefixIcon: Padding(
                //           padding: const EdgeInsets.symmetric(horizontal: 8.0),
                //           child: SvgPicture.asset("assets/icons/email.svg"),
                //         )),
                //   ),
                // ),
                // const Text(
                //   "Password",
                //   style: TextStyle(color: Colors.black54),
                // ),
                // Padding(
                //   padding: const EdgeInsets.only(top: 8.0, bottom: 16),
                //   child: TextFormField(
                //     validator: (value) {
                //       if (value!.isEmpty) {
                //         return "";
                //       }
                //       return null;
                //     },
                //     onSaved: (password) {},
                //     controller: passwordController,
                //     obscureText: true,
                //     style: const TextStyle(
                //       color: CupertinoColors.black
                //     ),
                //     decoration: InputDecoration(
                //         prefixIcon: Padding(
                //           padding: const EdgeInsets.symmetric(horizontal: 8.0),
                //           child: SvgPicture.asset("assets/icons/password.svg"),
                //         )),
                //   ),
                // ),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.grey,
                        blurRadius: 80,
                        spreadRadius: 1,
                      )
                    ],
                  ),
                  child: Column(
                    children: [
                      InputCustomizado(
                        hint: 'e-mail',
                        obscure: false,
                        controller: emailController,
                        style: const TextStyle(
                                color: CupertinoColors.black
                        ),
                        icon: Icon(Icons.email),
                      ),
                      Container(
                        decoration: const BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey,
                              spreadRadius: 0.5,
                              blurRadius: 0.5,
                            ),
                          ],
                        ),
                      ),
                      InputCustomizado(
                        hint: 'Password',
                        obscure: true,
                        controller: passwordController,
                        style: const TextStyle(
                            color: CupertinoColors.black
                        ),
                        icon: Icon(Icons.lock),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 40,),
                Padding(
                  padding: const EdgeInsets.only(top: 8.0, bottom: 24),
                  child: ElevatedButton.icon(
                      onPressed: () {
                        signIn(context);
                      },
                      style: ElevatedButton.styleFrom(
                          backgroundColor:Color(0xff204099),
                          minimumSize: const Size(double.infinity, 56),
                          shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.only(
                                  topLeft: Radius.circular(10),
                                  topRight: Radius.circular(25),
                                  bottomRight: Radius.circular(25),
                                  bottomLeft: Radius.circular(25)))),
                      icon: const Icon(
                        CupertinoIcons.arrow_right,
                        color: Colors.white,
                      ),
                      label: const Text("Sign In",
                      style: TextStyle(
                        color: Colors.white
                      ),)),
                )
              ],

            )),
        isShowLoading
            ? CustomPositioned(
            child: RiveAnimation.asset(
              "assets/RiveAssets/check.riv",
              onInit: (artboard) {
                StateMachineController controller =
                getRiveController(artboard);
                check = controller.findSMI("Check") as SMITrigger;
                error = controller.findSMI("Error") as SMITrigger;
                reset = controller.findSMI("Reset") as SMITrigger;
              },
            ))
            : const SizedBox(),
        isShowConfetti
            ? CustomPositioned(
            child: Transform.scale(
              scale: 6,
              child: RiveAnimation.asset(
                "assets/RiveAssets/confetti.riv",
                onInit: (artboard) {
                  StateMachineController controller =
                  getRiveController(artboard);
                  confetti =
                  controller.findSMI("Trigger explosion") as SMITrigger;
                },
              ),
            ))
            : const SizedBox()
      ],
    );
  }
}

class CustomPositioned extends StatelessWidget {
  const CustomPositioned({super.key, required this.child, this.size = 100});
  final Widget child;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: Column(
        children: [
          Spacer(),
          SizedBox(
            height: size,
            width: size,
            child: child,
          ),
          Spacer(flex: 2),
        ],
      ),
    );
  }
}
