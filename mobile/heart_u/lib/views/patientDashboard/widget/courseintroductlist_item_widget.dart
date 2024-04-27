import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import '../../../core/app_export.dart';
import '../../../theme/custom_button_style.dart';
import '../../../widgets/custom_elevated_button.dart'; // ignore: must_be_immutable

class CourseintroductlistItemWidget extends StatelessWidget {
  const CourseintroductlistItemWidget({Key? key})
      : super(
    key: key,
  );

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: 19.h,
          vertical: 14.v,
        ),
        decoration: BoxDecoration(
          color: Colors.grey,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: 176.h,
              child: RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                      text: "Report 01\n",
                      style: theme.textTheme.bodyLarge,
                    ),
                    TextSpan(
                      text: "Results",
                      style: theme.textTheme.headlineLarge,
                    )
                  ],
                ),
                textAlign: TextAlign.left,
              ),
            ),
            SizedBox(height: 4.v),
            SizedBox(
              width: 149.h,
              child: Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.bodySmall,
              ),
            ),
            SizedBox(height: 12.v),
            _buildStartButton(context)
          ],
        ),
      ),
    );
  }

  /// Section Widget
  Widget _buildStartButton(BuildContext context) {
    return BounceInDown(
      duration: const Duration(milliseconds: 1000),
      child: CustomElevatedButton(
        onPressed: (){
          Navigator.of(context).pushNamed(AppRoutes.chatList);
        },
        height: 35.v,
        width: 152.h,
        text: "Consult Bot",
        buttonStyle: CustomButtonStyles.fillLightBlue,
      ),
    );
  }
}
