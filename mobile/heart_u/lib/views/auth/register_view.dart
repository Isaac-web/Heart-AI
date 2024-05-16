
import 'dart:ui';

import 'package:animate_do/animate_do.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:heart_u/views/auth/widgets/heading_text.dart';
import 'package:rive/rive.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/app_export.dart';
import '../../core/utils/constants.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';
import 'package:awesome_dialog/awesome_dialog.dart';

import '../onboarding/widget/custom_input.dart';

class RegisterUserScreen extends StatefulWidget {
  const RegisterUserScreen({super.key});

  @override
  State<RegisterUserScreen> createState() => _RegisterUserScreenState();
}

class _RegisterUserScreenState extends State<RegisterUserScreen> {
  TextEditingController nameController = TextEditingController();

  TextEditingController emailController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  TextEditingController repeatPasswordController = TextEditingController();

  TextEditingController phoneController = TextEditingController();

  TextEditingController ageController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final Dio dio = Dio();

  var loading = false;

  int selectedOption = 1;

  @override
  void dispose() {
    nameController.dispose();
    passwordController.dispose();
    repeatPasswordController.dispose();
    phoneController.dispose();
    emailController.dispose();
    ageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Stack(
          children: [
            Positioned(
                width: MediaQuery.of(context).size.width * 1.7,
                bottom: 200,
                left: 100,
                child: Image.asset('assets/Backgrounds/Spline.png')),
            const RiveAnimation.asset('assets/RiveAssets/shapes.riv'),
            GestureDetector(
              onTap: ()=>Navigator.pop(context),
              child: const Padding(
                padding: EdgeInsets.all(8.0),
                child: Icon(
                  Icons.arrow_back_ios_new,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(
                vertical: 0,
                horizontal: 50,
              ),
              child: MainHeading(
                title: "HeartAI",
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 50, left: 20, right: 20),
              child: ClipRect(
                child: BackdropFilter(
                  filter: ImageFilter.blur(
                    sigmaX: 16,
                    sigmaY: 16,
                  ),
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(10)),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 20,
                      ),
                      child: Form(
                        key: _formKey,
                        child: SizedBox(
                          width: double.maxFinite,
                          child: Column(
                            children: [
                              SizedBox(height: 22.v),
                              Expanded(
                                child: SingleChildScrollView(
                                  child: Container(
                                    padding: EdgeInsets.symmetric(horizontal: 12.h),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [

                                        Bounce(
                                          duration: const Duration(milliseconds: 1000),
                                          child: Image(
                                              height: 300.v,
                                              image: const AssetImage("assets/images/Frame5.png")
                                          ),
                                        ),
                                        SizedBox(height: 11.v),
                                        FadeInUp(
                                            duration: const Duration(milliseconds: 1000),
                                            child: _buildName(context)
                                        ),
                                        SizedBox(height: 18.v),
                                        FadeInUp(
                                            duration: const Duration(milliseconds: 1000),
                                            child: _buildLName(context)
                                        ),
                                        SizedBox(height: 18.v),
                                        FadeInUp(
                                            duration: const Duration(milliseconds: 1000),
                                            child: _buildAge(context)
                                        ),
                                        SizedBox(height: 18.v),
                                        FadeInUp(
                                          duration: const Duration(milliseconds: 1000),
                                          child: Column(
                                              children: <Widget>[
                                                ListTile(
                                                    title: const Text('Male'),
                                                    leading: Radio<int>(
                                                      value: 1,
                                                      groupValue: selectedOption,
                                                      onChanged: (value) {
                                                        setState(() {
                                                          selectedOption = value!;
                                                          print(selectedOption);
                                                        });
                                                      },
                                                    )
                                                ),
                                                ListTile(
                                                  title: const Text('Female'),
                                                  leading: Radio<int>(
                                                    value: 0,
                                                    groupValue: selectedOption,
                                                    onChanged: (value) {
                                                      setState(() {
                                                        selectedOption = value!;
                                                        print(selectedOption);
                                                      });
                                                    },
                                                  ),
                                                ),
                                              ]
                                          ),
                                        ),


                                        FadeInUp(
                                            duration: const Duration(milliseconds: 1000),
                                            child: _buildUserName(context)
                                        ),
                                        SizedBox(height: 18.v),
                                        FadeInUp(
                                            duration: const Duration(milliseconds: 1000),
                                            child: _buildPassword(context)
                                        ),
                                        SizedBox(height: 18.v),
                                        FadeInUp(
                                            duration: const Duration(milliseconds: 1000),
                                            child: _buildRepeatPassword(context)
                                        ),
                                        SizedBox(height: 35.v),
                                        FadeInRight(
                                            duration: const Duration(milliseconds: 1000),
                                            child: CircularWidgetLoading(
                                                loading: loading,
                                                child: _buildSigninas(context))
                                        ),
                                        SizedBox(height: 10.v),
                                        TextButton(
                                          onPressed: (){
                                            Navigator.of(context).pushNamed(
                                                AppRoutes.initialRoute);
                                          },
                                          child: const Text(
                                            "Login",
                                            textAlign: TextAlign.left,
                                          ),
                                        )
                                        // FadeInLeft(
                                        //     duration: const Duration(milliseconds: 1000),
                                        //     child: _buildSigninas1(context)
                                        // )
                                      ],
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ]
        ),
        ),
    );
  }

  /// Section Widget
  Widget _buildName(BuildContext context) {
    return InputCustomizado(
      controller: nameController,
      hint: 'Enter full name',

    );
  }

  /// Section Widget
  Widget _buildLName(BuildContext context) {
    return InputCustomizado(
      controller: phoneController,
      hint: 'Enter Phone number',
      icon: const Icon(Icons.phone),
      style: const TextStyle(
        color: Colors.black
      ),
    );
  }

  Widget _buildAge(BuildContext context) {
    return InputCustomizado(
      controller: ageController,
      hint: 'Enter age',
      icon: const Icon(Icons.child_care),
      style: const TextStyle(
          color: Colors.black
      ),
    );
  }

  /// Section Widget
  Widget _buildUserName(BuildContext context) {
    return InputCustomizado(
      controller: emailController,
      hint: 'Enter email',
      icon: const Icon(Icons.email),
      style: const TextStyle(
          color: Colors.black
      ),
    );
  }

  /// Section Widget
  Widget _buildPassword(BuildContext context) {
    return InputCustomizado(
      controller: passwordController,
      hint: 'Enter password',
      icon: const Icon(Icons.lock),
      style: const TextStyle(
          color: Colors.black
      ),
    );
  }

  Widget _buildRepeatPassword(BuildContext context) {
    return InputCustomizado(
      controller: repeatPasswordController,
      hint: 'Confirm password',
      icon: const Icon(Icons.lock),
      style: const TextStyle(
          color: Colors.black
      ),
    );
  }

  /// Section Widget
  Widget _buildSigninas(BuildContext context) {
    return CustomElevatedButton(
      onPressed: () async {
        String password = passwordController.text;
        String email = emailController.text;
        String name = nameController.text;
        String phone = phoneController.text;
        String repeatPass = repeatPasswordController.text;
        String age = ageController.text;
        if (password.isEmpty || name.isEmpty ||
            email.isEmpty || repeatPass.isEmpty || phone.isEmpty
            || age.isEmpty){

          AwesomeDialog(
            context: context,
            dialogType: DialogType.warning,
            headerAnimationLoop: true,
            animType: AnimType.bottomSlide,
            title: 'Enter credentials',
            desc: 'Enter your details to create account',
            buttonsTextStyle: const TextStyle(color: Colors.black),
            showCloseIcon: true,
            btnOkOnPress: () {},
          ).show();

        }else if(password != repeatPass){

          AwesomeDialog(
            context: context,
            dialogType: DialogType.error,
            animType: AnimType.rightSlide,
            headerAnimationLoop: true,
            title: 'Error',
            desc:
            'Password does not match',
            btnOkOnPress: () {},
            btnOkIcon: Icons.cancel,
            btnOkColor: Colors.red,
          ).show();

        } else {

          print("dio initialised");

          try {

            setState(() {
              loading = true;
            });

            print("register initialised");
            Response response = await dio.post(
              "${baseUrl}api/users/register",
              data: {
                "name": name ,
                "email" : email,
                "password": password,
                "phone": phone,
                "age": age,
                "confirmPassword": repeatPass,
                "sex": selectedOption.toString(),
              },
              options: Options(
                responseType: ResponseType.json,
                validateStatus: (statusCode){
                  if(statusCode == null){
                    return false;
                  }
                  if(statusCode == 422){
                    return true;
                  }else{
                    return statusCode >= 200 && statusCode < 300;
                  }
                },
              ),
            );

            print('Response: ${response.data}');

            if (response.statusCode == 200){

              setState(() {
                loading = false;
              });

              Fluttertoast.showToast(
                  msg: "✔️ Account created successfully",
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.CENTER,
                  timeInSecForIosWeb: 1,
                  fontSize: 16.0
              );

              Navigator.of(context).pushNamedAndRemoveUntil(
                  AppRoutes.initialRoute, (route) => false);

            }else {
              setState(() {
                loading = false;
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


          } catch (e) {
            setState(() {
              loading = false;
            });
            AwesomeDialog(
              context: context,
              dialogType: DialogType.error,
              animType: AnimType.rightSlide,
              headerAnimationLoop: true,
              title: 'Error',
              desc:
              e.toString(),
              btnOkOnPress: () {},
              btnOkIcon: Icons.cancel,
              btnOkColor: Colors.red,
            ).show();
            print('Error sending message: $e');
          }
        }
      },
      height: 43.v,
      text: "Register",
      buttonStyle: CustomButtonStyles.fillPinkA,
    );
  }

/// Section Widget
// Widget _buildSigninas1(BuildContext context) {
//   return CustomElevatedButton(
//     onPressed: (){
//       String password = passwordController.text;
//       String username = userNameController.text;
//       if (password.isEmpty && username.isEmpty){
//
//         AwesomeDialog(
//           context: context,
//           dialogType: DialogType.warning,
//           headerAnimationLoop: true,
//           animType: AnimType.bottomSlide,
//           title: 'Enter credentials',
//           desc: 'User credentials cant be empty',
//           buttonsTextStyle: const TextStyle(color: Colors.black),
//           showCloseIcon: true,
//           btnOkOnPress: () {},
//         ).show();
//
//       } else {
//         Navigator.of(context).pushNamedAndRemoveUntil(
//             AppRoutes.doctorDashboardScreen, (route) => false);
//       }
//     },
//     height: 43.v,
//     text: "Sign in as doctor",
//     buttonStyle: CustomButtonStyles.fillPrimaryTL10,
//   );
// }
}

enum BestTutorSite { javatpoint, w3schools, tutorialandexample }