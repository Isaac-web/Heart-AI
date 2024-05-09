import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';

class ColumnItemWidget extends StatelessWidget {
  String title;
  String content;
   ColumnItemWidget({super.key, required this.title, required this.content});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 24.h,
        vertical: 12.v,
      ),

      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: theme.textTheme.titleLarge,
          ),
          SizedBox(height: 16.v),
          Container(
            width: 275.h,
            margin: EdgeInsets.only(right: 19.h),
            child: Text(
              content,
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

class ColumnItem {
  final String title;
  final String content;

  ColumnItem(
      {
        required this.title,
        required this.content,
      }
      );

}

List cards = [
  ColumnItem(
      title: "Chatbot Integration",
      content: "Learn more about your health results by interacting with "
          "artificial intelligence"),
  ColumnItem(
      title: "Detailed Report",
      content: "View your results sent by doctors"),
  ColumnItem(
      title: "Certified Doctor's Report",
      content: "Receive report from expert doctors on the go"),
];