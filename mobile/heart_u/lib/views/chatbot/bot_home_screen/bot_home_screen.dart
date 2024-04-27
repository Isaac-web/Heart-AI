import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import '../../../theme/custom_button_style.dart';
import '../../../widgets/custom_elevated_button.dart';
import 'widgets/recentchatlist_item_widget.dart';

class BotHomeScreen extends StatelessWidget {
  const BotHomeScreen({Key? key})
      : super(
          key: key,
        );

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          width: double.maxFinite,
          padding: EdgeInsets.symmetric(
            horizontal: 20.h,
            vertical: 31.v,
          ),
          child: Column(
            children: [
              _buildRecentChatColumn(context),
              SizedBox(height: 40.v),
              _buildRecentChatsRow(context),
              SizedBox(height: 18.v),
              _buildRecentChatList(context)
            ],
          ),
        ),
        bottomNavigationBar: _buildStartNewButton(context),
      ),
    );
  }


  /// Section Widget
  Widget _buildRecentChatColumn(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(left: 3.h),
          child: Text(
            "Chat with Bot",
            style: theme.textTheme.titleLarge,
          ),
        ),
        SizedBox(height: 18.v),
        Container(
          padding: EdgeInsets.symmetric(
            horizontal: 6.h,
            vertical: 5.v,
          ),
          decoration: AppDecoration.fillOnPrimaryContainer.copyWith(
            borderRadius: BorderRadiusStyle.roundedBorder12,
          ),
          child: FadeIn(
            duration: const Duration(milliseconds: 1000),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Image.asset(
                   "assets/images/Frame2.png",
                  height: 60.adaptSize,
                  width: 60.adaptSize,
                ),
                Padding(
                  padding: EdgeInsets.only(
                    left: 20.h,
                    top: 15.v,
                    bottom: 12.v,
                  ),
                  child: Column(
                    children: [
                      Text(
                        "Bot is online and ready to chat",
                        style: theme.textTheme.titleSmall,
                      ),
                      SizedBox(height: 12.v),
                    ],
                  ),
                ),
                Container(
                  height: 15.adaptSize,
                  width: 15.adaptSize,
                  margin: EdgeInsets.only(
                    left: 7.h,
                    bottom: 75.v,
                  ),
                  decoration: BoxDecoration(
                    color: appTheme.lightGreenA700E5,
                    borderRadius: BorderRadius.circular(
                      7.h,
                    ),
                  ),
                )
              ],
            ),
          ),
        )
      ],
    );
  }

  /// Section Widget
  Widget _buildRecentChatsRow(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 3.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "Recent  chats",
            style: theme.textTheme.titleLarge,
          ),
        ],
      ),
    );
  }

  /// Section Widget
  Widget _buildRecentChatList(BuildContext context) {
    return ListView.separated(
      shrinkWrap: true,
      separatorBuilder: (context, index) {
        return SizedBox(
          height: 20.v,
        );
      },
      itemCount: 3,
      itemBuilder: (context, index) {
        return const RecentchatlistItemWidget();
      },
    );
  }

  /// Section Widget
  Widget _buildStartNewButton(BuildContext context) {
    return BounceInDown(
      duration: const Duration(milliseconds: 1000),
      child: CustomElevatedButton(
        onPressed: (){
          Navigator.of(context).pushNamed(AppRoutes.chatList);
        },
        height: 45.v,
        text: "Start new conversation",
        margin: EdgeInsets.only(
          left: 52.h,
          right: 53.h,
          bottom: 47.v,
        ),
        buttonStyle: CustomButtonStyles.none,
        decoration: CustomButtonStyles.gradientLightGreenToPrimaryDecoration,
      ),
    );
  }
}
