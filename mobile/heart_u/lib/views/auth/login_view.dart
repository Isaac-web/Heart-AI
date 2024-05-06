
import 'package:animate_do/animate_do.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/app_export.dart';
import '../../core/utils/constants.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';
import '../../widgets/custom_text_form_feild.dart';
import 'package:awesome_dialog/awesome_dialog.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController userNameController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final Dio dio = Dio();

  var loading = false;

  var jsonList;

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
                            child: const Image(
                                image: AssetImage("assets/images/Frame5.png")
                            ),
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
                                  AppRoutes.register);
                            },
                            child: const Text(
                                "Register",
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
  Widget _buildUserName(BuildContext context) {
    return CustomTextFormField(
      textInputType: TextInputType.emailAddress,
      controller: userNameController,
      hintText: "Enter Email",
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

  /// Section Widget
  Widget _buildSigninas(BuildContext context) {
    return CustomElevatedButton(
      onPressed: () async {

        SharedPreferences prefs = await SharedPreferences.getInstance();

        String password = passwordController.text;
        String username = userNameController.text;
        if (password.isEmpty || username.isEmpty){

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

        }else {

          print("dio initialised");

          try {

            setState(() {
              loading = true;
            });

            print("login initialised");
            Response response = await dio.post(
              "${baseUrl}api/users/login",
              data: {
                "email" : username,
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

            print("Message is $token");

            prefs.setString('token', token);
            prefs.setString('email', username);
            prefs.setString("password", password);

            if (response.statusCode == 200){

              setState(() {
                loading = false;
              });

              Navigator.of(context).pushNamedAndRemoveUntil(
                  AppRoutes.patientDashboardScreen, (route) => false);

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
              "An error occurred, please try again later",
              btnOkOnPress: () {},
              btnOkIcon: Icons.cancel,
              btnOkColor: Colors.red,
            ).show();
            print('Error sending message: $e');
          }
        }
        },
      height: 43.v,
      text: "Sign in",
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
