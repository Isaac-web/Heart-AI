import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_datetime_picker_plus/flutter_datetime_picker_plus.dart';
import 'package:heart_u/views/patientDashboard/widget/extension.dart';
import 'package:heart_u/views/patientDashboard/widget/light_color.dart';
import 'package:heart_u/views/patientDashboard/widget/text_style.dart';
import 'package:heart_u/views/patientDashboard/widget/theme.dart';
import 'package:rive/rive.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher_string.dart';
import '../../core/utils/constants.dart';
import '../onboarding/widget/sign_in_form.dart';

class DetailPage extends StatefulWidget {
  DetailPage({Key? key, required this.model}) : super(key: key);
  var model;

  @override
  _DetailPageState createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {
  @override

  final Dio dio = Dio();
  bool isShowLoading = false;
  bool isShowConfetti = false;

  late SMITrigger check;
  late SMITrigger error;
  late SMITrigger reset;

  late SMITrigger confetti;

  StateMachineController getRiveController(Artboard artboard) {
    StateMachineController? controller =
    StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    return controller;
  }

  void initState() {
    super.initState();
  }

  Widget _appbar() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        BackButton(color: Theme.of(context).primaryColor),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    TextStyle titleStyle = TextStyles.title.copyWith(fontSize: 25).bold;
    if (AppTheme.fullWidth(context) < 393) {
      titleStyle = TextStyles.title.copyWith(fontSize: 23).bold;
    }
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: <Widget>[
            Image.asset("assets/docs/doc.png", height: MediaQuery.of(context).size.width * 0.8,),
            DraggableScrollableSheet(
              maxChildSize: .8,
              initialChildSize: .6,
              minChildSize: .6,
              builder: (context, scrollController) {
                return Container(
                  height: AppTheme.fullHeight(context) * .5,
                  padding: const EdgeInsets.only(left:19,right:19,top: 16),//symmetric(horizontal: 19, vertical: 16),
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(30),
                        topRight: Radius.circular(30)),
                    color: Colors.white.withOpacity(1),
                  ),
                  child: SingleChildScrollView(
                    physics: BouncingScrollPhysics(),
                    controller: scrollController,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        ListTile(
                          contentPadding: EdgeInsets.all(0),
                          title: Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: <Widget>[
                              Text(
                                "${"Dr. "+widget.model["name"]}",
                                style: titleStyle,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Icon(Icons.check_circle,
                                  size: 18,
                                  color: Theme.of(context).primaryColor),
                            ],
                          ),
                          subtitle: Text(
                            widget.model["hospital"] ?? "Hospital not provided",
                            style: TextStyles.bodySm.subTitleColor.bold,
                          ),
                        ),
                        const Divider(
                          thickness: .3,
                          color: LightColor.grey,
                        ),
                        Text("About", style: titleStyle).vP16,
                        Text(
                          widget.model["bio"] ?? "Bio not provided",
                          style: TextStyles.body.subTitleColor,
                        ),

                      ],
                    ),
                  ),
                );
              },
            ),
            _appbar(),
            isShowLoading
                ? CustomPositioned(
                child: RiveAnimation.asset(
                  "assets/RiveAssets/check.riv",
                  onInit: (artboard) {
                    StateMachineController controller =
                    getRiveController(artboard);
                    check = controller.findSMI("Check") as SMITrigger;
                    error = controller.findSMI("Error") as SMITrigger;
                    reset = controller.findSMI("Reset") as SMITrigger;
                  },
                ))
                : const SizedBox(),
            isShowConfetti
                ? CustomPositioned(
                child: Transform.scale(
                  scale: 6,
                  child: RiveAnimation.asset(
                    "assets/RiveAssets/confetti.riv",
                    onInit: (artboard) {
                      StateMachineController controller =
                      getRiveController(artboard);
                      confetti =
                      controller.findSMI("Trigger explosion") as SMITrigger;
                    },
                  ),
                ))
                : const SizedBox()
          ],
        ),
      ),
      bottomNavigationBar:   Container(
        margin: EdgeInsets.all(10),
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            color: LightColor.grey.withAlpha(150)
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            Container(
              height: 45,
              width: 45,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: LightColor.grey.withAlpha(150)
              ),
              child: Icon(Icons.call, color: Colors.white,),
            ).ripple((){
              launchUrlString("tel://"+widget.model["phone"]);
            }, borderRadius:BorderRadius.circular(10), ),
            const SizedBox(
              width: 10,
            ),
            Container(
              height: 45,
              width: 45,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: LightColor.grey.withAlpha(150)
              ),
              child: Icon(Icons.chat_bubble, color: Colors.white,),
            ).ripple((){
              launchUrlString("mailto:"+widget.model["email"]);
            }, borderRadius:BorderRadius.circular(10), ),
            SizedBox(
              width: 10,
            ),
            TextButton(
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty
                    .all(LightColor.purple),
              ),
              onPressed: () {

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
                  onConfirm: (date) async {
                    setState(() {
                      sDate = date.toString().
                      substring(0, date.toString()
                          .indexOf(' '));
                    });
                    print('confirm $date');
                    print('change $sDate');

                    SharedPreferences prefs = await SharedPreferences.getInstance();

                    print("dio initialised");

                    print("Date is $sDate");

                    var token = prefs.getString("token");

                    try {

                      setState(() {
                        isShowLoading = true;
                        isShowConfetti = true;
                      });

                      print("appointment initialised");
                      Response response = await dio.post(
                        "${baseUrl}api/medical-reports/requests",
                        data: {
                          "patientId" : prefs.getString("userId"),
                          "doctorId" : widget.model["_id"],
                          "appointmentDate": sDate,
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


                        check.fire();
                        Future.delayed(Duration(seconds: 2), () {
                          setState(() {
                            isShowLoading = false;
                          });
                          confetti.fire();
                        });

                        Future.delayed(Duration(milliseconds: 2500),(){
                          AwesomeDialog(
                            context: context,
                            dialogType: DialogType.success,
                            animType: AnimType.rightSlide,
                            headerAnimationLoop: true,
                            title: 'Success',
                            desc: "Request successfully sent",
                            btnOkOnPress: () {},
                          ).show();
                        });

                      }else {
                        error.fire();
                        Future.delayed(Duration(seconds: 2), () {
                          setState(() {
                            isShowLoading = false;
                          });
                        });

                        Future.delayed(Duration(milliseconds: 2500),(){
                          AwesomeDialog(
                            context: context,
                            dialogType: DialogType.error,
                            animType: AnimType.rightSlide,
                            headerAnimationLoop: true,
                            title: 'Error',
                            desc: response.data["message"],
                            btnOkOnPress: () {},
                            btnOkIcon: Icons.cancel,
                            btnOkColor: Colors.red,
                          ).show();
                        });
                      }

                    } catch (e) {

                      error.fire();
                      Future.delayed(Duration(seconds: 2), () {
                        setState(() {
                          isShowLoading = false;
                        });
                      });

                      print('Error sending message: $e');
                      Future.delayed(Duration(milliseconds: 2500),(){
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
                      });
                    }

                  },
                );

              },
              child: const Text("Make an appointment",
                style: TextStyle(
                    color: Colors.white
                ),
              ).p(8),
            ),
          ],
        ).vP16,
      ),
    );
  }
}