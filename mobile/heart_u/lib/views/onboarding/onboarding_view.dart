import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import 'package:heart_u/views/onboarding/widget/column_item_widget.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';
import 'package:animate_do/animate_do.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SizedBox(
          width: SizeUtils.width,
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.only(bottom: 5.v),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 20.v,),
                  _buildRowskilled(context),
                  SizedBox(height: 38.v),
                  FadeInLeft(
                    duration: const Duration(milliseconds: 1000),
                    child: Container(
                      margin: EdgeInsets.only(left: 16.h),
                      child: const Text(
                        "Healthcare, at your call.",
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 25
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 15.v),
                  FadeIn(
                    duration: const Duration(milliseconds: 1000),
                    child: Container(
                      width: 319.h,
                      margin: EdgeInsets.only(
                        left: 16.h,
                        right: 39.h,
                      ),
                      child: Text(
                        "Welcome! This app helps you understand your heart health by estimating your risk of heart disease.",
                        maxLines: 3,
                        overflow: TextOverflow.ellipsis,
                        style: CustomTextStyles.titleMediumBluegray400.copyWith(
                          height: 1.63,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 20.v),
                  FadeInUp(
                    duration: const Duration(milliseconds: 1000),
                    child: CustomElevatedButton(
                      onPressed: (){
                        Navigator.of(context).pushNamed(AppRoutes.login);
                      },
                      height: 46.v,
                      width: 150.h,
                      text: "Get Started",
                      margin: EdgeInsets.only(left: 16.h),
                      buttonStyle: CustomButtonStyles.none,
                      decoration:
                      CustomButtonStyles.gradientOnPrimaryToPinkADecoration,
                    ),
                  ),
                  SizedBox(height: 43.v),
                  FadeInUp(
                      duration: const Duration(milliseconds: 1000),
                      child: _buildColumncheckouto(context)
                  ),
                  SizedBox(height: 32.v),
                  _buildColumn(context)
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  /// Section Widget
  Widget _buildRowskilled(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.h),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            FadeInUp(
              duration: const Duration(milliseconds: 1000),
              child: Padding(
                padding: EdgeInsets.only(
                  top: 6.v,
                  bottom: 5.v,
                ),
                child: Text(
                  "HeartAI",
                  style: theme.textTheme.headlineMedium,
                ),
              ),
            ),
            FadeInDown(
              duration: const Duration(milliseconds: 1000),
              child: CustomElevatedButton(
                onPressed: (){
                  Navigator.of(context).pushNamed(AppRoutes.login);
                },
                width: 140.h,
                text: "Get Started",
              ),
            )
          ],
        ),
      ),
    );
  }

  /// Section Widget
  Widget _buildColumncheckouto(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: Container(
        width: 343.h,
        margin: EdgeInsets.only(
          left: 12.h,
          right: 20.h,
        ),
        padding: EdgeInsets.symmetric(
          horizontal: 114.h,
          vertical: 13.v,
        ),
        decoration: AppDecoration.gradientOnPrimaryToPinkA.copyWith(
          borderRadius: BorderRadiusStyle.roundedBorder10,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: 2.v),
            Text(
              "Features",
              style: theme.textTheme.headlineSmall,
            )
          ],
        ),
      ),
    );
  }

  /// Section Widget
  Widget _buildColumn(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 16.h,
        vertical: 14.v,
      ),
      decoration: AppDecoration.fillGray,
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        separatorBuilder: (context, index) {
          return SizedBox(
            height: 24.v,
          );
        },
        itemCount: cards.length,
        itemBuilder: (context, index) {
          return FadeInUp(
              duration: const Duration(milliseconds: 1000),
              child: ColumnItemWidget(
                title: cards[index].title,
                content: cards[index].content,)
          );
        },
      ),
    );
  }

}
