
import 'package:animate_do/animate_do.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/app_export.dart';
import '../../core/utils/constants.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';
import '../../widgets/custom_text_form_feild.dart';
import 'package:awesome_dialog/awesome_dialog.dart';

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
                              child: const Text(
                                "HeartAI",
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 30,
                                ),
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
      hintText: "Enter Full Name",
      borderDecoration: OutlineInputBorder(
        borderRadius: BorderRadius.circular(4.h),
        borderSide: const BorderSide(color: Color(0xff204099), width: 0.0),
      ),
    );
  }

  /// Section Widget
  Widget _buildLName(BuildContext context) {
    return CustomTextFormField(
      controller: phoneController,
      hintText: "Enter Phone number",
      textInputType: TextInputType.number,
      borderDecoration: OutlineInputBorder(
        borderRadius: BorderRadius.circular(4.h),
        borderSide: const BorderSide(color: Color(0xff204099), width: 0.0),
      ),
    );
  }

  Widget _buildAge(BuildContext context) {
    return CustomTextFormField(
      controller: ageController,
      hintText: "Enter Age",
      textInputType: TextInputType.number,
      borderDecoration: OutlineInputBorder(
        borderRadius: BorderRadius.circular(4.h),
        borderSide: const BorderSide(color: Color(0xff204099), width: 0.0),
      ),
    );
  }

  /// Section Widget
  Widget _buildUserName(BuildContext context) {
    return CustomTextFormField(
      textInputType: TextInputType.emailAddress,
      controller: emailController,
      hintText: "Enter email",
      borderDecoration: OutlineInputBorder(
        borderRadius: BorderRadius.circular(4.h),
        borderSide: const BorderSide(color: Color(0xff204099), width: 0.0),
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
      borderDecoration: OutlineInputBorder(
        borderRadius: BorderRadius.circular(4.h),
        borderSide: const BorderSide(color: Color(0xff204099), width: 0.0),
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
      borderDecoration: OutlineInputBorder(
        borderRadius: BorderRadius.circular(4.h),
        borderSide: const BorderSide(color: Color(0xff204099), width: 0.0),
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

enum BestTutorSite { javatpoint, w3schools, tutorialandexample }