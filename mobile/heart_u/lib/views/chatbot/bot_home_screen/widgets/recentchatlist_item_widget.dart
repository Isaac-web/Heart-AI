import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';

class RecentchatlistItemWidget extends StatelessWidget {
  const RecentchatlistItemWidget({Key? key})
      : super(
          key: key,
        );

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
                Text(
                  "View Chat -  Mar 28,2023 ",
                  style: theme.textTheme.titleSmall,
                ),
                SizedBox(height: 12.v),
                SizedBox(
                  width: 221.h,
                  child: Text(
                    "Viewed your Chat history on, 28 March 2023",
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.labelLarge,
                  ),
                )
              ],
            ),
          ),
          GestureDetector(
            onTap: (){
              AwesomeDialog(
                context: context,
                dialogType: DialogType.warning,
                dismissOnTouchOutside: true,
                dismissOnBackKeyPress: false,
                headerAnimationLoop: true,
                animType: AnimType.leftSlide,
                title: 'Confirm',
                desc: 'Do you want to delete this chat ?',
                showCloseIcon: true,
                btnCancelOnPress: () {},
                btnOkOnPress: () {},
              ).show();
            },
              child: const Icon(Icons.more_vert))
        ],
      ),
    );
  }
}
