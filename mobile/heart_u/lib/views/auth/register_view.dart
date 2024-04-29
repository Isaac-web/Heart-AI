import 'dart:convert';

import 'package:animate_do/animate_do.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/utils/constants.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/app_export.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';
import '../../widgets/custom_text_form_feild.dart';
import 'package:awesome_dialog/awesome_dialog.dart';

class RegisterUserScreen extends StatefulWidget {
  RegisterUserScreen({Key? key})
      : super(
    key: key,
  );

  @override
  State<RegisterUserScreen> createState() => _RegisterUserScreenState();
}

class _RegisterUserScreenState extends State<RegisterUserScreen> {
  TextEditingController nameController = TextEditingController();

  TextEditingController emailController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  TextEditingController repeatPasswordController = TextEditingController();

  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final Dio dio = Dio();

  var loading = false;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Form(
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
                          Padding(
                            padding: EdgeInsets.only(left: 11.h),
                            child: FadeInLeft(
                              duration: const Duration(milliseconds: 1000),
                              child: Text(
                                "HeartAI",
                                style: theme.textTheme.headlineMedium,
                              ),
                            ),
                          ),

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
                          SizedBox(height: 11.v),
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
                          SizedBox(height: 49.v),
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
                                  AppRoutes.login);
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
    );
  }

  /// Section Widget
  Widget _buildName(BuildContext context) {
    return CustomTextFormField(
      controller: nameController,
      hintText: "Enter full Name",
      textStyle: TextStyle(
          color: Colors.grey[700]
      ),
    );
  }

  /// Section Widget
  Widget _buildUserName(BuildContext context) {
    return CustomTextFormField(
      textInputType: TextInputType.emailAddress,
      controller: emailController,
      hintText: "Enter email",
      textStyle: TextStyle(
          color: Colors.grey[700]
      ),
    );
  }

  /// Section Widget
  Widget _buildPassword(BuildContext context) {
    return CustomTextFormField(
      controller: passwordController,
      hintText: "Enter password",
      textInputAction: TextInputAction.done,
      textInputType: TextInputType.visiblePassword,
      obscureText: true,
      textStyle:TextStyle(
          color: Colors.grey[700]
      ),
    );
  }

  Widget _buildRepeatPassword(BuildContext context) {
    return CustomTextFormField(
      controller: repeatPasswordController,
      hintText: "Repeat password",
      textInputAction: TextInputAction.done,
      textInputType: TextInputType.visiblePassword,
      obscureText: true,
      textStyle:TextStyle(
          color: Colors.grey[700]
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
        String repeatPass = repeatPasswordController.text;
        if (password.isEmpty || name.isEmpty ||
            email.isEmpty || repeatPass.isEmpty){

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

          String _baseUrl = baseUrl;

          print("dio initialised");

          try {

            setState(() {
              loading = true;
            });

            print("register initialised");
            Response response = await dio.post(
              "${_baseUrl}api/users/register",
              data: {
                "name": name ,
                "email" : email,
                "password": password,
                "userType": "patient"
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

              Navigator.of(context).pushNamedAndRemoveUntil(
                  AppRoutes.login, (route) => false);

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
