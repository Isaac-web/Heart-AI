import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';

class ColumnItemWidget extends StatelessWidget {
  const ColumnItemWidget({Key? key})
      : super(
    key: key,
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 24.h,
        vertical: 52.v,
      ),
      decoration: AppDecoration.outlineIndigoB.copyWith(
        borderRadius: BorderRadiusStyle.roundedBorder10,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Chatbot Integration",
            style: theme.textTheme.titleLarge,
          ),
          SizedBox(height: 16.v),
          Container(
            width: 275.h,
            margin: EdgeInsets.only(right: 19.h),
            child: Text(
              "Learn more about your health results by interacting with artificial intelligence(AI)",
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: CustomTextStyles.titleMediumBluegray400.copyWith(
                height: 1.63,
              ),
            ),
          ),
          SizedBox(height: 33.v)
        ],
      ),
    );
  }
}
