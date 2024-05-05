 import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../../core/app_export.dart';
import '../../../core/utils/constants.dart';

class CourseintroductlistItemWidget2 extends StatefulWidget {
  String descrip;
  String name;
  CourseintroductlistItemWidget2({super.key, required this.descrip,
    required this.name});

  @override
  State<CourseintroductlistItemWidget2> createState() => _CourseintroductlistItemWidget2State();
}

class _CourseintroductlistItemWidget2State extends State<CourseintroductlistItemWidget2> {

  final Dio dio = Dio();
  late SharedPreferences prefs;
  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: GestureDetector(
          onTap: () async {

            prefs = await SharedPreferences.getInstance();

            print("dio initialised");

            var token = prefs.getString("token");

            try {

              setState(() {
                loading = true;
              });

              print("session creation initialised");
              Response response = await dio.post(
                "${baseUrl}api/medical-reports/requests",
                data: {
                  "patientId" : prefs.getString("userId"),
                  "doctorId" : widget.descrip,
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

                AwesomeDialog(
                  context: context,
                  dialogType: DialogType.success,
                  animType: AnimType.rightSlide,
                  headerAnimationLoop: true,
                  title: 'Success',
                  desc:
                  "Request successfully sent",
                  btnOkOnPress: () {},
                  btnOkIcon: Icons.cancel,
                  btnOkColor: Colors.red,
                ).show();
                // final jsonData = response.data;
                // final sessionId = jsonData['data']['_id'];
                // final patientId = jsonData['data']['patientId'];
                //
                // prefs.setString('sessionId', sessionId);
                // prefs.setString('patientId', patientId);


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
                  response.data["message"],
                  btnOkOnPress: () {},
                  btnOkIcon: Icons.cancel,
                  btnOkColor: Colors.red,
                ).show();
              }

            } catch (e) {

              setState(() {
                loading = false;
              });

              print('Error sending message: $e');
              AwesomeDialog(
                context: context,
                dialogType: DialogType.error,
                animType: AnimType.rightSlide,
                headerAnimationLoop: true,
                title: 'Error',
                desc:
                e.toString(),
                btnOkOnPress: () {},
                btnOkIcon: Icons.cancel,
                btnOkColor: Colors.red,
              ).show();
            }

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
                    width: 149.h,
                    child: Text(
                      widget.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                          color: Colors.black
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
