import 'dart:math';

import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/views/chatbot/bot_home_screen/chat_view.dart';
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../../core/app_export.dart';
import '../../../core/utils/constants.dart';
import '../../../theme/custom_button_style.dart';
import '../../../widgets/custom_elevated_button.dart';

class CourseintroductlistItemWidget extends StatefulWidget {
  String descrip;
  String id;
  String docId;
  String reportId;
  String date;
  String age;
  String sex;
  String trestbps;
  String chol;
  String fbs;
  String thalach;
  String exang;
  String oldPeak;
  String slope;
  String ca;
  String cp_1;
  String cp_2;String cp_3;String restecg_1;String restecg_2;String thal_1;
  String thal_2;String thal_3;String status;

  CourseintroductlistItemWidget({super.key, required this.descrip,
    required this.id,
    required this.docId,required this.reportId,
    required this.date,required this.age,
    required this.sex,required this.trestbps,required this.chol,
    required this.fbs,
    required this.thalach,required this.exang,required this.oldPeak,
    required this.slope,
    required this.ca,required this.cp_1,required this.cp_2,
    required this.cp_3,required this.restecg_1,required this.restecg_2,
    required this.thal_1,required this.thal_2,required this.thal_3,
    required this.status,});

  @override
  State<CourseintroductlistItemWidget> createState() => _CourseintroductlistItemWidgetState();
}

class _CourseintroductlistItemWidgetState extends State<CourseintroductlistItemWidget> {
  var loading = false;
  final Dio dio = Dio();

  @override
  Widget build(BuildContext context) {

    String report = "Patient Id: ${widget.id} \n"
        "Doctor Id: ${widget.docId} \n"
        "Report Id: ${widget.reportId} \n"
        "Date: ${widget.date} \n"
        "age: ${widget.age} \n"
        "Sex: ${widget.sex}  \n\n"
        "Resting blood pressure in mm Hg: ${widget.trestbps} \n\n"
        "Serum cholesterol in mg/dl: ${widget.chol} \n\n"
        "Fasting blood sugar level, categorized as above 120 mg/dl: ${widget.fbs} \n\n"
        "Maximum heart rate achieved during a stress test: ${widget.thalach} \n\n"
        "Exercise-induced angina: ${widget.exang} \n\n"
        "T depression induced by exercise relative to rest: ${widget.oldPeak} \n\n"
        "slope of the peak exercise ST segment: ${widget.slope} \n\n"
        "Number of major vessels (0-4) colored by fluoroscopy: ${widget.ca} \n\n"
        "chest pain type 1: ${widget.cp_1} \n\n"
        "chest pain type 2: ${widget.cp_2} \n\n"
        "chest pain type 3: ${widget.cp_3} \n\n"
        "Resting electrocardiographic results 1: ${widget.restecg_1} \n\n"
        "Resting electrocardiographic results 2: ${widget.restecg_2} \n\n"
        "Thallium stress test results 1: ${widget.thal_1} \n\n"
        "Thallium stress test results 2: ${widget.thal_2} \n\n"
        "Thallium stress test results 3: ${widget.thal_3} \n\n"
        "Status: ${widget.status} \n";

    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: GestureDetector(
          onTap: (){
            AwesomeDialog(
              context: context,
              animType: AnimType.topSlide,
              dialogType: DialogType.info,
              title: "Report Details",
              showCloseIcon: true,
              headerAnimationLoop: true,
              body: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: <Widget>[
                    const SizedBox(
                      height: 10,
                    ),
                    Text(
                      'Report Details',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 10,),

                    Text(
                      report,
                      textAlign: TextAlign.left,
                    ),

                    const SizedBox(height: 10,),

                    AnimatedButton(
                        isFixedHeight: false,
                        icon: Icons.share,
                        text: 'Share',
                        pressEvent: () {
                          Share.share(report,subject: "Test result");
                        }
                    ),

                    const SizedBox(height: 10,),

                  ],
                ),
              ),
            ).show();
          },
          child: CircularWidgetLoading(
            loading: loading,
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
                  Row(
                    children: [
                      SizedBox(
                        width: 149.h,
                        child: Text(
                              "Status: ${widget.status} \n",
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              color: Colors.black
                          ),
                        ),
                      ),
                      SizedBox(width: 30.v),
                      _buildStartButton(context)
                    ],
                  ),

                ],
              ),
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
        onPressed: () async {

          late SharedPreferences prefs;
          prefs = await SharedPreferences.getInstance();

          String? token = prefs.getString('token');

          print("dio initialised");

          try {

            setState(() {
              loading = true;
            });

            num randomNumber = Random().nextInt(1000000 - 1) + 1;

            print("session creation initialised");
            Response response = await dio.post(
              "${baseUrl}api/chat-sessions/me",
              data: {
                "title" : "Result ${widget.reportId} chat $randomNumber",
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

              setState(() {
                loading = false;
              });

              final jsonData = response.data;
              final sessionId = jsonData['data']['_id'];
              final patientId = jsonData['data']['patientId'];

              prefs.setString('sessionId', sessionId);
              prefs.setString('patientId', patientId);

              Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => ChatScreen(chatContext:  "Patient Id: ${widget.id} \n"
                      "Doctor Id: ${widget.docId} \n"
                      "Report Id: ${widget.reportId} \n"
                      "Date: ${widget.date} \n"
                      "Age: ${widget.age} \n"
                      "Sex: ${widget.sex}  \n\n"
                      "Resting blood pressure in mm Hg: ${widget.trestbps} \n\n"
                      "Serum cholesterol in mg/dl: ${widget.chol} \n\n"
                      "Fasting blood sugar level, categorized as above 120 mg/dl: ${widget.fbs} \n\n"
                      "Maximum heart rate achieved during a stress test: ${widget.thalach} \n\n"
                      "Exercise-induced angina: ${widget.exang} \n\n"
                      "T depression induced by exercise relative to rest: ${widget.oldPeak} \n\n"
                      "slope of the peak exercise ST segment: ${widget.slope} \n\n"
                      "Number of major vessels (0-4) colored by fluoroscopy: ${widget.ca} \n\n"
                      "chest pain type 1: ${widget.cp_1} \n\n"
                      "chest pain type 2: ${widget.cp_2} \n\n"
                      "chest pain type 3: ${widget.cp_3} \n\n"
                      "Resting electrocardiographic results 1: ${widget.restecg_1} \n\n"
                      "Resting electrocardiographic results 2: ${widget.restecg_2} \n\n"
                      "Thallium stress test results 1: ${widget.thal_1} \n\n"
                      "Thallium stress test results 2: ${widget.thal_2} \n\n"
                      "Thallium stress test results 3: ${widget.thal_3} \n\n"
                      "Status: ${widget.status} \n",)));

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


        },
        height: 35.v,
        width: 100.h,
        text: "Consult Bot",
        buttonStyle: CustomButtonStyles.fillLightBlue,
      ),
    );
  }
}
