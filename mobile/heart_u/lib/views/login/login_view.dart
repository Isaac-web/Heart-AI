import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import '../../core/app_export.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';
import '../../widgets/custom_text_form_feild.dart';

class RegisterScreen extends StatefulWidget {
  RegisterScreen({Key? key})
      : super(
    key: key,
  );

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  TextEditingController userNameController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
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
                      margin: EdgeInsets.only(bottom: 399.v),
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
                          
                          const Image(
                              image: AssetImage("assets/images/Frame5.png")
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
                              child: _buildSigninas(context)
                          ),
                          SizedBox(height: 10.v),
                          FadeInLeft(
                              duration: const Duration(milliseconds: 1000),
                              child: _buildSigninas1(context)
                          )
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
      controller: userNameController,
      hintText: "Enter username",
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
      onPressed: (){
        Navigator.of(context).pushNamed(AppRoutes.patientDashboardScreen);
      },
      height: 43.v,
      text: "Sign in as patient",
      buttonStyle: CustomButtonStyles.fillPinkA,
    );
  }

  /// Section Widget
  Widget _buildSigninas1(BuildContext context) {
    return CustomElevatedButton(
      onPressed: (){
        Navigator.of(context).pushNamed(AppRoutes.doctorDashboardScreen);
      },
      height: 43.v,
      text: "Sign in as doctor",
      buttonStyle: CustomButtonStyles.fillPrimaryTL10,
    );
  }
}
