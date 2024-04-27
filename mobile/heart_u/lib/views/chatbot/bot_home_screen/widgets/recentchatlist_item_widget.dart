import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import '../../../../core/utils/image_constant.dart';
import '../../../../widgets/custom_image_view.dart';

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
          )
        ],
      ),
    );
  }
}