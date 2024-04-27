import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import 'package:heart_u/views/patientDashboard/widget/courseintroductlist_item_widget.dart';
import '../../core/utils/image_constant.dart';
import '../../widgets/appbar_title.dart';
import '../../widgets/appbar_trailing_circleimage.dart';
import '../../widgets/custom_app_bar.dart';


class PatientDashboard extends StatefulWidget {
  PatientDashboard({Key? key})
      : super(
    key: key,
  );

  @override
  State<PatientDashboard> createState() => _PatientDashboardState();
}

class _PatientDashboardState extends State<PatientDashboard> {

  GlobalKey<NavigatorState> navigatorKey = GlobalKey();

  TextEditingController searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: _buildAppBar(context),
        body: Container(
          width: double.maxFinite,
          padding: EdgeInsets.symmetric(
            horizontal: 32.h,
            vertical: 12.v,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // CustomSearchView(
              //   controller: searchController,
              //   hintText: "Search",
              // ),
              SizedBox(height: 15.v),
              Text(
                "Reports",
                style: theme.textTheme.titleLarge,
              ),
              SizedBox(height: 16.v),
              _buildCourseIntroductList(context),
              FadeInRight(
                duration: const Duration(milliseconds: 1000),
                child: FloatingActionButton.extended(
                    backgroundColor: const Color.fromRGBO(82, 170, 94, 1.0),
                    onPressed: (){
                      Navigator.of(context).pushNamed(AppRoutes.chatScreen);
                    },
                    label: const Text("Chat with bot"),
                    icon: const Icon(Icons.messenger, color: Colors.white, size: 25,)
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  /// Section Widget
  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return CustomAppBar(
      title: const Padding(
        padding: EdgeInsets.only(left: 10.0),
        child: Text(
          "HeartAI",
          style: TextStyle(
            color: Colors.black,
            fontSize: 28,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      actions: [
        AppbarTitle(
          text: "Abdul Razak",
          margin: EdgeInsets.fromLTRB(31.h, 18.v, 12.h, 6.v),
        ),
        AppbarTrailingCircleimage(
          onTap: (){
            AwesomeDialog(
              context: context,
              animType: AnimType.topSlide,
              dialogType: DialogType.info,
              title: "Patient Info",
              showCloseIcon: true,
              body: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: <Widget>[
                    const SizedBox(
                      height: 10,
                    ),
                    Text(
                      'Patient Details',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 15,),

                    Text(
                      'Abdul Razak',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 10,),

                    Text(
                      'Male',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 10,),

                    Text(
                      '0550000000',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 10,),

                    Text(
                      '...',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                      isFixedHeight: false,
                      text: 'Log Out',
                      pressEvent: () {
                        Navigator.of(context).pushNamedAndRemoveUntil(
                            AppRoutes.registerScreen,
                                (route) => false);
                      },
                    )
                  ],
                ),
              ),
            ).show();
          },
          imagePath: ImageConstant.imgEllipse1,
          margin: EdgeInsets.only(
            left: 8.h,
            top: 12.v,
            right: 43.h,
          ),
        )
      ],
    );
  }


  /// Section Widget
  Widget _buildCourseIntroductList(BuildContext context) {
    return Expanded(
      child: ListView.separated(
        physics: BouncingScrollPhysics(),
        shrinkWrap: true,
        separatorBuilder: (context, index) {
          return SizedBox(
            height: 16.v,
          );
        },
        itemCount: 4,
        itemBuilder: (context, index) {
          return const CourseintroductlistItemWidget();
        },
      ),
    );
  }

}