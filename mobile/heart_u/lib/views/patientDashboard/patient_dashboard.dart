import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import 'package:heart_u/views/patientDashboard/widget/courseintroductlist_item_widget.dart';
import 'package:heart_u/views/patientDashboard/widget/courseintroductlist_item_widget2.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/utils/constants.dart';
import '../../core/utils/image_constant.dart';
import '../../widgets/appbar_title.dart';
import '../../widgets/appbar_trailing_circleimage.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_text_form_feild.dart';


class PatientDashboard extends StatefulWidget {
  const PatientDashboard({super.key});

  @override
  State<PatientDashboard> createState() => _PatientDashboardState();
}

class _PatientDashboardState extends State<PatientDashboard> {

  GlobalKey<NavigatorState> navigatorKey = GlobalKey();

  TextEditingController searchController = TextEditingController();

  TextEditingController userNameController = TextEditingController();

  final Dio dio = Dio();

  var loading = false;
  var isLoading = false;
  var show = false;
  var datalist;
  var datalist2;

  late SharedPreferences prefs;
  Future<void> getData()async {
     prefs = await SharedPreferences.getInstance();

    print("dio initialised");

    var token = prefs.getString("token");

    try {

      setState(() {
        loading = true;
      });

      print("detail retrieval initialised");
      Response response = await dio.get(
        "${baseUrl}api/users/me",
        data: {
          "email" : prefs.getString("email"),
          "password": prefs.getString("password"),
        },
        options: Options(
          headers: {
            "Authorization": "Bearer ${token!}"
          },
          validateStatus: (_) => true,
        ),
      );

      Response response2 = await dio.get(
        "${baseUrl}api/medical-reports/me",
        options: Options(
          headers: {
            "Authorization": "Bearer $token"
          },
          validateStatus: (_) => true,
        ),
      );


      Response response3 = await dio.get(
        "${baseUrl}api/users?userType=doctor",
        data: {
          "name": "userType",
          "value": "doctor",
          "isPath": false,
        },
        options: Options(
          headers: {
            "Authorization": "Bearer $token"
          },
          validateStatus: (_) => true,
        ),
      );

      print('Response: ${response3.data}');

      print('Response: ${response2.data}');

      print('Response: ${response.data}');


      if (response3.statusCode == 200){
        setState(() {
          loading = false;
          datalist2 = response3.data["data"] as List;
        });
      }else {
        setState(() {
          loading = false;
        });
        AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          animType: AnimType.rightSlide,
          headerAnimationLoop: true,
          title: 'Error',
          desc:
          'Please try again later',
          btnOkOnPress: () {},
          btnOkIcon: Icons.cancel,
          btnOkColor: Colors.red,
        ).show();
      }

      if (response2.statusCode == 200){

        setState(() {
          datalist = response2.data["data"] as List;
        });

        setState(() {
          loading = false;
        });

        final jsonData = response.data;

        final name = jsonData['data']['name'];
        final patientId = jsonData['data']['_id'];

        prefs.setString("userId", patientId);
        prefs.setString("name", name);

      }else {
        setState(() {
          loading = false;
        });
        AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          animType: AnimType.rightSlide,
          headerAnimationLoop: true,
          title: 'Error',
          desc:
          'Please try again later',
          btnOkOnPress: () {},
          btnOkIcon: Icons.cancel,
          btnOkColor: Colors.red,
        ).show();
      }

      if (response.statusCode == 200){

        setState(() {
          loading = false;
        });

        final jsonData = response.data;

        final name = jsonData['data']['name'];
        final patientId = jsonData['data']['_id'];

        prefs.setString("userId", patientId);
        prefs.setString("name", name);

      }else {
        setState(() {
          loading = false;
        });
        AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          animType: AnimType.rightSlide,
          headerAnimationLoop: true,
          title: 'Error',
          desc:
          'Please try again later',
          btnOkOnPress: () {},
          btnOkIcon: Icons.cancel,
          btnOkColor: Colors.red,
        ).show();
      }

    } catch (e) {
      setState(() {
        loading = false;
      });
      AwesomeDialog(
        context: context,
        dialogType: DialogType.error,
        animType: AnimType.rightSlide,
        headerAnimationLoop: true,
        title: 'Error',
        desc:
        "Please try again later",
        btnOkOnPress: () {},
        btnOkIcon: Icons.cancel,
        btnOkColor: Colors.red,
      ).show();
      print('Error sending message: $e');
    }
  }

 @override
  void initState() {
    getData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: _buildAppBar(context),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // CustomSearchView(
            //   controller: searchController,
            //   hintText: "Search",
            // ),
            SizedBox(height: 15.v),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 8.0),
                  child: Text(
                    "Reports",
                    style: theme.textTheme.titleLarge,
                  ),
                ),
                FadeInRight(
                  duration: const Duration(milliseconds: 1000),
                  child:
                  FloatingActionButton(
                      backgroundColor: appTheme.pinkA20001,
                      onPressed: (){
                        Navigator.of(context).pushNamed(AppRoutes.chatScreen);
                      },
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(28),
                      ),
                      elevation: 50.0,
                      child: Bounce(
                        infinite: true,
                          delay: const Duration(seconds: 1),
                          child: const ImageIcon(
                            color: Color(0xFF13183F),
                              AssetImage("assets/images/Frame2.png"))),
                  )
                )
              ],
            ),
            SizedBox(height: 16.v),
            _buildCourseIntroductList(context),
          ],
        ),
      ),
    );
  }

  /// Section Widget
  PreferredSizeWidget _buildAppBar(BuildContext context) {

    String? docId;

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
          onTap: (){

          },
          text: prefs.getString("name").toString(),
          margin: EdgeInsets.fromLTRB(31.h, 18.v, 12.h, 6.v),
        ),
        AppbarTrailingCircleimage(
          onTap: (){
            AwesomeDialog(
              context: context,
              animType: AnimType.topSlide,
              dialogType: DialogType.info,
              title: "Patient Details",
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
                      'Name: ${prefs.getString("name")}',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 10,),

                    Text(
                      'Email: ${prefs.getString("email")}',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),

                    const SizedBox(height: 20,),

                    AnimatedButton(
                      isFixedHeight: false,
                      icon: Icons.refresh,
                      text: 'Refresh system data',
                      pressEvent: () {
                        getData();
                      }
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                      isFixedHeight: false,
                      text: 'Update details',
                      pressEvent: () {
                        AwesomeDialog(
                          context: context,
                          animType: AnimType.scale,
                          headerAnimationLoop: true,
                          dialogType: DialogType.question,
                          keyboardAware: true,
                          body: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: <Widget>[
                                Visibility(
                                  visible: show,
                                  child: const Text(
                                    'Error: Please try again later',
                                    style: TextStyle(
                                        fontSize: 25,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.red
                                    ),
                                  ),
                                ),

                                const SizedBox(height: 10,),

                                Text(
                                  'Enter name',
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                                const SizedBox(
                                  height: 20,
                                ),
                                Material(
                                    elevation: 0,
                                    color: Colors.blueGrey.withAlpha(40),
                                    child: CustomTextFormField(
                                      controller: userNameController,
                                      hintText: "Enter Your update name",
                                      textInputAction: TextInputAction.done,
                                      textInputType: TextInputType.text,
                                      obscureText: false,
                                      textStyle:TextStyle(
                                          color: Colors.grey[700]
                                      ),
                                    )
                                ),
                                const SizedBox(
                                  height: 20,
                                ),
                                CircularWidgetLoading(
                                    loading: isLoading,
                                    child: const Text(".")),

                                const SizedBox()  ,

                                AnimatedButton(
                                  isFixedHeight: false,
                                  text: 'Update',
                                  pressEvent: () async {

                                    print("dio initialised");

                                    var token = prefs.getString("token");

                                    try {

                                      setState(() {
                                        isLoading = false;
                                      });

                                      print("session creation initialised");
                                      Response response = await dio.patch(
                                        "${baseUrl}api/users/me",
                                        data: {
                                          "name" : userNameController.text,
                                        },
                                        options: Options(
                                          headers: {
                                            "Authorization": "Bearer ${token!}"
                                          },
                                          validateStatus: (_) => true,
                                        ),
                                      );

                                      print('Response: ${response.data}');

                                      if (response.statusCode == 200){

                                        prefs.setString("name",
                                            userNameController.text);

                                        setState(() {
                                          isLoading = false;
                                        });

                                        // final jsonData = response.data;
                                        // final sessionId = jsonData['data']['_id'];
                                        // final patientId = jsonData['data']['patientId'];
                                        //
                                        // prefs.setString('sessionId', sessionId);
                                        // prefs.setString('patientId', patientId);


                                      }else {
                                        setState(() {
                                          isLoading = false;
                                        });

                                        setState(() {
                                          show = true;
                                        });
                                      }

                                    } catch (e) {
                                      setState(() {
                                        isLoading = false;
                                      });
                                      setState(() {
                                        show = true;
                                      });
                                      print('Error sending message: $e');
                                    }

                                  },
                                ),
                              ],
                            ),
                          ),
                        ).show();
                      },
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                      isFixedHeight: false,
                      text: 'Request report',
                      pressEvent: () {
                        AwesomeDialog(
                          context: context,
                          animType: AnimType.scale,
                          headerAnimationLoop: true,
                          dialogType: DialogType.question,
                          keyboardAware: true,
                          body: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: <Widget>[
                                Visibility(
                                  visible: show,
                                  child: const Text(
                                    'Error: Please try again later',
                                    style: TextStyle(
                                        fontSize: 25,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.red
                                    ),
                                  ),
                                ),

                                const SizedBox(height: 10,),

                                Text(
                                  'Select doctor',
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                                const SizedBox(
                                  height: 20,
                                ),
                                Material(
                                  elevation: 0,
                                  color: Colors.blueGrey.withAlpha(40),
                                  child:  SizedBox(
                                    height: double.maxFinite,
                                    width: double.maxFinite,
                                    child: ListView.separated(
                                      physics: const BouncingScrollPhysics(),
                                      shrinkWrap: false,
                                      separatorBuilder: (context, index) {
                                        return SizedBox(
                                          height: 16.v,
                                        );
                                      },
                                      itemCount: datalist2 == null ? 0 :  datalist2.length,
                                      itemBuilder: (context, index) {
                                        return CourseintroductlistItemWidget2(
                                            descrip: datalist2[index]["_id"],
                                          name: datalist2[index]["name"],
                                        );
                                      },
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 20,
                                ),

                                // AnimatedButton(
                                //   isFixedHeight: false,
                                //   text: 'Send Request',
                                //   pressEvent: () async {
                                //
                                //     String _baseUrl = baseUrl;
                                //
                                //     print("dio initialised");
                                //
                                //     var token = prefs.getString("token");
                                //
                                //     try {
                                //
                                //       setState(() {
                                //         isLoading = false;
                                //       });
                                //
                                //       print("session creation initialised");
                                //       Response response = await dio.post(
                                //         "${_baseUrl}api/medical-reports/requests",
                                //         data: {
                                //           "patientId" : prefs.getString("userId"),
                                //           "doctorId" : docId,
                                //         },
                                //         options: Options(
                                //           headers: {
                                //             "Authorization": "Bearer ${token!}"
                                //           },
                                //           validateStatus: (_) => true,
                                //         ),
                                //       );
                                //
                                //       print('Response: ${response.data}');
                                //
                                //       if (response.statusCode == 200){
                                //
                                //
                                //         setState(() {
                                //           isLoading = false;
                                //         });
                                //
                                //         // final jsonData = response.data;
                                //         // final sessionId = jsonData['data']['_id'];
                                //         // final patientId = jsonData['data']['patientId'];
                                //         //
                                //         // prefs.setString('sessionId', sessionId);
                                //         // prefs.setString('patientId', patientId);
                                //
                                //
                                //       }else {
                                //         setState(() {
                                //           isLoading = false;
                                //         });
                                //
                                //         setState(() {
                                //           show = true;
                                //         });
                                //       }
                                //
                                //     } catch (e) {
                                //       setState(() {
                                //         isLoading = false;
                                //       });
                                //       setState(() {
                                //         show = true;
                                //       });
                                //       print('Error sending message: $e');
                                //     }
                                //
                                //   },
                                // ),
                              ],
                            ),
                          ),
                        ).show();

                      },
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                      isFixedHeight: false,
                      text: 'Log Out',
                      pressEvent: () {
                        Navigator.of(context).pushNamedAndRemoveUntil(
                            AppRoutes.login,
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
        ),
      ],
    );
  }


  /// Section Widget
  Widget _buildCourseIntroductList(BuildContext context) {
    return Expanded(
      child: CircularWidgetLoading(
        loading: loading,
        child: ListView.separated(
          physics: const BouncingScrollPhysics(),
          shrinkWrap: false,
          separatorBuilder: (context, index) {
            return SizedBox(
              height: 16.v,
            );
          },
          itemCount: datalist == null ? 0 :  datalist.length,
          itemBuilder: (context, index) {
            return CourseintroductlistItemWidget(
              descrip: datalist[index].toString(),
              docId: datalist[index]["doctorId"].toString(),
              id: datalist[index]["patientId"].toString(),
              reportId: datalist[index]["_id"].toString(),
              date: datalist[index]["createdAt"].toString(),
              age: datalist[index]["age"].toString(),
              sex: datalist[index]["sex"].toString() == "0" ? "male" : "female",
              trestbps: datalist[index]["trestbps"].toString(),
              chol: datalist[index]["chol"].toString(),
              fbs: datalist[index]["fbs"].toString() == "0" ? "false" : "true",
              thalach: datalist[index]["thalach"].toString(),
              exang: datalist[index]["exang"].toString() == "0" ? "No" : "Yes",
              oldPeak: datalist[index]["oldpeak"].toString(),
              slope: datalist[index]["slope"].toString() == "0" ? "Upsloping" :
              datalist[index]["slope"].toString() == "1"? "flat"
                  : "Downsloping",
              ca: datalist[index]["ca"].toString(),

              cp_1: datalist[index]["cp_1"].toString() == "0" ? "Typical angina"
                  : datalist[index]["cp_1"].toString() == "1" ?
              "Atypical angina" : datalist[index]["cp_1"].toString() == "2" ?
              "Non-anginal pain" : "Asymptomatic",

              cp_2: datalist[index]["cp_2"].toString() == "0" ? "Typical angina"
                  : datalist[index]["cp_2"].toString() == "1" ?
              "Atypical angina" : datalist[index]["cp_2"].toString() == "2" ?
              "Non-anginal pain" : "Asymptomatic",

              cp_3: datalist[index]["cp_3"].toString() == "0" ? "Typical angina"
                  : datalist[index]["cp_3"].toString() == "1" ?
              "Atypical angina" : datalist[index]["cp_3"].toString() == "2" ?
              "Non-anginal pain" : "Asymptomatic",

              restecg_1: datalist[index]["restecg_1"].toString() == "0" ?
              "Normal" : datalist[index]["restecg_1"].toString() == "1" ?
              "having ST-T wave abnormality" : "Showing probable or definite "
                  "left ventricular hypertrophy" ,

              restecg_2: datalist[index]["restecg_2"].toString() == "0" ?
              "Normal" : datalist[index]["restecg_2"].toString() == "1" ?
              "having ST-T wave abnormality" : "Showing probable or definite "
                  "left ventricular hypertrophy" ,

              thal_1: datalist[index]["thal_1"].toString() == "0" ? "Normal" :
              datalist[index]["thal_1"].toString() == "1" ? "Fixed defect"
                  : datalist[index]["thal_1"].toString() == "2" ?
              "Reversible defect" : "Not described"   ,

              thal_2: datalist[index]["thal_2"].toString() == "0" ? "Normal" :
              datalist[index]["thal_2"].toString() == "1" ? "Fixed defect"
                  : datalist[index]["thal_2"].toString() == "2" ?
              "Reversible defect" : "Not described"   ,

              thal_3: datalist[index]["thal_3"].toString() == "0" ? "Normal" :
              datalist[index]["thal_3"].toString() == "1" ? "Fixed defect"
                  : datalist[index]["thal_3"].toString() == "2" ?
              "Reversible defect" : "Not described"   ,

              status: datalist[index]["cardioStatus"].toString() == "0" ?
              "No disease" : "Presence of disease" ,
            );
          },
        ),
      ),
    );
  }

}
