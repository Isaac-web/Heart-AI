import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
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
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: GestureDetector(
          onTap: (){
            AwesomeDialog(
              context: context,
              dialogType: DialogType.info,
              headerAnimationLoop: true,
              animType: AnimType.bottomSlide,
              title: 'Report details',
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  " Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              buttonsTextStyle: const TextStyle(color: Colors.black),
              showCloseIcon: true,
              btnOkOnPress: () {},
            ).show();
          },
          child: Container(
            padding: EdgeInsets.symmetric(
              horizontal: 19.h,
              vertical: 14.v,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: Colors.white,
              boxShadow: const [
                BoxShadow(
                  color: Color(0x41A9A9A9),
                  offset: Offset(-12, 12),
                  blurRadius: 8,
                ),
              ],

            ),
            alignment: Alignment.centerLeft,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 176.h,
                  child: RichText(
                    text: const TextSpan(
                      children: [
                        TextSpan(
                          text: "Results",
                          style: TextStyle(
                            fontSize: 30,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontStyle: FontStyle.italic,
                          ),
                        )
                      ],
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                SizedBox(height: 4.v),
                SizedBox(
                  width: 149.h,
                  child: const Text(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Colors.black
                    ),
                  ),
                ),
                SizedBox(height: 12.v),
                _buildStartButton(context)
              ],
            ),
          ),
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
        width: 100.h,
        text: "Consult Bot",
        buttonStyle: CustomButtonStyles.fillLightBlue,
      ),
    );
  }
}
