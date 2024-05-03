import 'dart:math';

import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/views/chatbot/bot_home_screen/chat_view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/app_export.dart';
import '../../../theme/custom_button_style.dart';
import '../../../widgets/custom_elevated_button.dart';

class CourseintroductlistItemWidget extends StatelessWidget {
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

  CourseintroductlistItemWidget({Key? key, required this.descrip,
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
    required this.status,})
      : super(
    key: key,
  );

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: GestureDetector(
          onTap: (){
            AwesomeDialog(
              context: context,
              dialogType: DialogType.info,
              headerAnimationLoop: true,
              animType: AnimType.bottomSlide,
              title: 'Report details',
              desc:  "Patient Id: $id \n"
                  "Doctor Id: $docId \n"
                  "Report Id: $reportId \n"
                  "Date: $date \n"
                  "age: $age \n"
                  "Sex: $sex  \n\n"
                  "Resting blood pressure in mm Hg: $trestbps \n\n"
                  "Serum cholesterol in mg/dl: $chol \n\n"
                  "Fasting blood sugar level, categorized as above 120 mg/dl: $fbs \n\n"
                  "Maximum heart rate achieved during a stress test: $thalach \n\n"
                  "Exercise-induced angina: $exang \n\n"
                  "T depression induced by exercise relative to rest: $oldPeak \n\n"
                  "slope of the peak exercise ST segment: $slope \n\n"
                  "Number of major vessels (0-4) colored by fluoroscopy: $ca \n\n"
                  "chest pain type 1: $cp_1 \n\n"
                  "chest pain type 2: $cp_2 \n\n"
                  "chest pain type 3: $cp_3 \n\n"
                  "Resting electrocardiographic results 1: $restecg_1 \n\n"
                  "Resting electrocardiographic results 2: $restecg_2 \n\n"
                  "Thallium stress test results 1: $thal_1 \n\n"
                  "Thallium stress test results 2: $thal_2 \n\n"
                  "Thallium stress test results 3: $thal_3 \n\n"
                  "Status: $status \n",
              buttonsTextStyle: const TextStyle(color: Colors.black),
              showCloseIcon: true,
              btnOkOnPress: () {},
            ).show();
          },
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
                SizedBox(
                  width: 149.h,
                  child: Text(
                    "Patient Id: $id \n"
                        "Doctor Id: $docId \n"
                        "Report Id: $reportId \n"
                        "Date: $date \n"
                        "age: $age \n"
                        "Sex: $sex  \n\n"
                        "Resting blood pressure in mm Hg: $trestbps \n\n"
                        "Serum cholesterol in mg/dl: $chol \n\n"
                        "Fasting blood sugar level, categorized as above 120 mg/dl: $fbs \n\n"
                        "Maximum heart rate achieved during a stress test: $thalach \n\n"
                        "Exercise-induced angina: $exang \n\n"
                        "T depression induced by exercise relative to rest: $oldPeak \n\n"
                        "slope of the peak exercise ST segment: $slope \n\n"
                        "Number of major vessels (0-4) colored by fluoroscopy: $ca \n\n"
                        "chest pain type 1: $cp_1 \n\n"
                        "chest pain type 2: $cp_2 \n\n"
                        "chest pain type 3: $cp_3 \n\n"
                        "Resting electrocardiographic results 1: $restecg_1 \n\n"
                        "Resting electrocardiographic results 2: $restecg_2 \n\n"
                        "Thallium stress test results 1: $thal_1 \n\n"
                        "Thallium stress test results 2: $thal_2 \n\n"
                        "Thallium stress test results 3: $thal_3 \n\n"
                        "Status: $status \n",
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.black
                    ),
                  ),
                ),
                SizedBox(height: 12.v),
                _buildStartButton(context)
              ],
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
          prefs.setString('patientId', id);

          Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => ChatScreen(chatContext:  "Patient Id: $id \n"
                  "Doctor Id: $docId \n"
                  "Report Id: $reportId \n"
                  "Date: $date \n"
                  "Age: $age \n"
                  "Sex: $sex  \n\n"
                  "Resting blood pressure in mm Hg: $trestbps \n\n"
                  "Serum cholesterol in mg/dl: $chol \n\n"
                  "Fasting blood sugar level, categorized as above 120 mg/dl: $fbs \n\n"
                  "Maximum heart rate achieved during a stress test: $thalach \n\n"
                  "Exercise-induced angina: $exang \n\n"
                  "T depression induced by exercise relative to rest: $oldPeak \n\n"
                  "slope of the peak exercise ST segment: $slope \n\n"
                  "Number of major vessels (0-4) colored by fluoroscopy: $ca \n\n"
                  "chest pain type 1: $cp_1 \n\n"
                  "chest pain type 2: $cp_2 \n\n"
                  "chest pain type 3: $cp_3 \n\n"
                  "Resting electrocardiographic results 1: $restecg_1 \n\n"
                  "Resting electrocardiographic results 2: $restecg_2 \n\n"
                  "Thallium stress test results 1: $thal_1 \n\n"
                  "Thallium stress test results 2: $thal_2 \n\n"
                  "Thallium stress test results 3: $thal_3 \n\n"
                  "Status: $status \n",)));
        },
        height: 35.v,
        width: 100.h,
        text: "Consult Bot",
        buttonStyle: CustomButtonStyles.fillLightBlue,
      ),
    );
  }
}
