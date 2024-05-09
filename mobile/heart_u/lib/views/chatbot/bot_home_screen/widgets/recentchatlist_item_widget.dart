import 'package:animate_do/animate_do.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';

class RecentchatlistItemWidget extends StatelessWidget {
  String title;
  String date;
  RecentchatlistItemWidget({super.key, required this.date, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 17.v),
      decoration: BoxDecoration(
        borderRadius: BorderRadiusStyle.roundedBorder12,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          BounceInDown(
            duration: const Duration(milliseconds: 1000),
            child: Image.asset(
              "assets/images/Frame2.png",
              height: 60.adaptSize,
              width: 60.adaptSize,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: 2.v),
            child: Column(
              children: [
                SizedBox(
                  width: 149.h,
                  child: Text(
                    "View Chat - $date",
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.titleSmall,
                  ),
                ),
                SizedBox(height: 12.v),
                SizedBox(
                  width: 221.h,
                  child: Text(
                    "Session title: $title",
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                )
              ],
            ),
          ),
          // GestureDetector(
          //   onTap: (){
          //     AwesomeDialog(
          //       context: context,
          //       dialogType: DialogType.warning,
          //       dismissOnTouchOutside: true,
          //       dismissOnBackKeyPress: false,
          //       headerAnimationLoop: true,
          //       animType: AnimType.leftSlide,
          //       title: 'Confirm',
          //       desc: 'Do you want to delete this chat ?',
          //       showCloseIcon: true,
          //       btnCancelOnPress: () {},
          //       btnOkOnPress: () {},
          //     ).show();
          //   },
          //     child: const Icon(Icons.more_vert))
        ],
      ),
    );
  }
}
