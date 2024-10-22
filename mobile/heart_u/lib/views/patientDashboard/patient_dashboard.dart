import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_datetime_picker_plus/flutter_datetime_picker_plus.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:heart_u/core/app_export.dart';
import 'package:heart_u/views/patientDashboard/widget/courseintroductlist_item_widget.dart';
import 'package:heart_u/views/patientDashboard/widget/courseintroductlist_item_widget2.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/utils/constants.dart';
import '../../core/utils/image_constant.dart';
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
  TextEditingController ageController = TextEditingController();


  final Dio dio = Dio();

  var loading = false;
  var isLoading = false;
  var show = false;
  var datalist;
  var datalist2;
  var isEmpty = true;
  int selectedOption = 1;

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
        "${baseUrl}api/doctors",
        options: Options(
          headers: {
            "Authorization": "Bearer $token"
          },
          validateStatus: (_) => true,
        ),
      );

      print('Response: ${response3.data}');

      print('Response: ${response2.data}');


      if (response3.statusCode == 200 && response2.statusCode == 200){
        setState(() {
          loading = false;
          datalist2 = response3.data["data"] as List;
          datalist = response2.data["data"] as List;
          if (datalist.isEmpty) {
            isEmpty = true;
          } else {
            isEmpty = false;
          }
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
        desc: e.toString(),
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
                const Padding(
                  padding: EdgeInsets.only(left: 8.0),
                  child: Text(
                    "Reports",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
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
            isEmpty ?
            Bounce(
              duration: const Duration(milliseconds: 1000),
              child:  Padding(
                padding: const EdgeInsets.fromLTRB(10.0,50,10,10),
                child: CircularWidgetLoading(
                  loading: loading,
                  child: const Column(
                    children: [
                      Text(
                        "Book an appointment to start your journey",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10,),
                      SingleChildScrollView(
                        child: Image(
                            image: AssetImage("assets/images/medical.png"),
                          width: 200,
                          height: 450,

                        ),
                      ),
                    ],
                  ),
                ),
              ),
            )
                :
            _buildCourseIntroductList(context),
          ],
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
            fontWeight: FontWeight.bold,
            fontSize: 30,
          ),
        ),
      ),
      actions: [
        Text(
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 15,
          ),
          prefs.getString("name").toString(),
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
                    const Text(
                      'Patient Details',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                    const SizedBox(height: 15,),
                    Text(
                      "Id: ${prefs.getString("userId")}",
                    ),
                    const SizedBox(height: 10,),
                    Text(
                      'Name: ${prefs.getString("name")}',
                    ),
                    const SizedBox(height: 10,),
                    Text(
                      'Age: ${prefs.getString("age")}',
                    ),
                    const SizedBox(height: 10,),Text(
                      'Phone: ${prefs.getString("phone")}',
                    ),
                    const SizedBox(height: 10,),Text(
                      'Sex: ${prefs.getString("sex") == "1" ? "Male" : "Female"}',
                    ),
                    const SizedBox(height: 10,),
                    Text(
                      'Email: ${prefs.getString("email")}',
                    ),

                    const SizedBox(height: 20,),

                    AnimatedButton(
                      isFixedHeight: false,
                      icon: Icons.refresh,
                      color: const Color(0xff204099),
                      text: 'Refresh system data',
                      pressEvent: () {
                        getData();
                      }
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                      isFixedHeight: false,
                      icon: Icons.cloud_upload,
                      text: 'Update details',
                      color: const Color(0xff204099),
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
                                  'Enter details',
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
                                const SizedBox(height: 10,),
                                Material(
                                    elevation: 0,
                                    color: Colors.blueGrey.withAlpha(40),
                                    child: CustomTextFormField(
                                      controller: ageController,
                                      hintText: "Enter Your update age",
                                      textInputAction: TextInputAction.done,
                                      textInputType: TextInputType.number,
                                      obscureText: false,
                                      textStyle:TextStyle(
                                          color: Colors.grey[700]
                                      ),
                                    )
                                ),
                                const SizedBox(height: 10,),
                                Column(
                                    children: <Widget>[
                                      ListTile(
                                          title: const Text('Male'),
                                          leading: Radio<int>(
                                            value: 1,
                                            groupValue: selectedOption,
                                            onChanged: (value) {
                                              setState(() {
                                                selectedOption = value!;
                                                Fluttertoast.showToast(
                                                    msg: "✔️ Male selected",
                                                    toastLength: Toast.LENGTH_SHORT,
                                                    gravity: ToastGravity.CENTER,
                                                    timeInSecForIosWeb: 1,
                                                    fontSize: 16.0
                                                );
                                                print(selectedOption);
                                              });
                                            },
                                          )
                                      ),
                                      ListTile(
                                        title: const Text('Female'),
                                        leading: Radio<int>(
                                          value: 0,
                                          groupValue: selectedOption,
                                          onChanged: (value) {
                                            setState(() {
                                              selectedOption = value!;
                                              Fluttertoast.showToast(
                                                  msg: "✔️ Female Selected",
                                                  toastLength: Toast.LENGTH_SHORT,
                                                  gravity: ToastGravity.CENTER,
                                                  timeInSecForIosWeb: 1,
                                                  fontSize: 16.0
                                              );
                                              print(selectedOption);
                                            });
                                          },
                                        ),
                                      ),
                                    ]
                                ),
                                const SizedBox(
                                  height: 20,
                                ),

                                const SizedBox()  ,

                                AnimatedButton(
                                  isFixedHeight: false,
                                  text: 'Update',
                                  color: const Color(0xff204099),
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
                                          "age": ageController.text.toString(),
                                          "sex": selectedOption.toString(),
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

                                        Fluttertoast.showToast(
                                            msg: "✔️ Details updated successfully",
                                            toastLength: Toast.LENGTH_SHORT,
                                            gravity: ToastGravity.CENTER,
                                            timeInSecForIosWeb: 1,
                                            fontSize: 16.0
                                        );

                                        prefs.setString("name",
                                            userNameController.text);

                                        prefs.setString("age",
                                            ageController.text.toString());

                                        prefs.setString("sex",
                                            userNameController.text.toString());

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
                      text: 'Book an appointment',
                      icon: Icons.calendar_month_outlined,
                      color: const Color(0xff204099),
                      pressEvent: () {

                        var sDate = "date";

                        DatePicker.showDatePicker(context,
                          showTitleActions: true,
                          minTime: DateTime.now(),
                          maxTime: DateTime(2030, 1, 1),
                          onChanged: (date) {
                            setState(() {
                              sDate = date.toString().
                              substring(0, date.toString()
                                  .indexOf(' '));
                            });
                            print('change $date');
                            print('change $sDate');
                          },
                          onConfirm: (date) {
                            setState(() {
                              sDate = date.toString().
                              substring(0, date.toString()
                                  .indexOf(' '));
                            });
                            print('confirm $date');
                            print('change $sDate');

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

                                    const SizedBox(
                                      height: 10,
                                    ),
                                    const Text(
                                      'Select doctor',
                                      style: TextStyle(
                                        fontSize: 25,
                                      ),
                                    ),
                                    const SizedBox(
                                      height: 5,
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
                                              date: sDate,
                                              descrip: datalist2[index]["_id"],
                                              name: datalist2[index]["firstName"]+" "+datalist2[index]["lastName"],
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
                        );


                      },
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                      isFixedHeight: false,
                      icon: Icons.logout_outlined,
                      text: 'Log Out',
                      color: const Color(0xff204099),
                      pressEvent: () async {
                        setState(() {
                          loading = true;
                        });
                        var cleared = await prefs.clear();
                        if (cleared == true){

                          setState(() {
                            loading = false;
                          });

                          Navigator.of(context).pushNamedAndRemoveUntil(
                              AppRoutes.initialRoute,
                                  (route) => false);
                        }

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
              chatContext: datalist[index],
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
