import 'dart:math';
import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:circular_seek_bar/circular_seek_bar.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:heart_u/views/patientDashboard/detail_page.dart';
import 'package:heart_u/views/patientDashboard/widget/extension.dart';
import 'package:heart_u/views/patientDashboard/widget/light_color.dart';
import 'package:heart_u/views/patientDashboard/widget/numbers_widget.dart';
import 'package:heart_u/views/patientDashboard/widget/text_style.dart';
import 'package:heart_u/views/patientDashboard/widget/theme.dart';
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../core/utils/constants.dart';
import '../../core/utils/image_constant.dart';
import '../../routes/app_routes.dart';
import '../chatbot/bot_home_screen/chat_view.dart' as path;

class HomePage extends StatefulWidget {
  HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var loading = false;
  late SharedPreferences prefs;
  final Dio dio = Dio();
  var datalist;
  var datalist2;

  Future<void> getData() async {
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
          headers: {"Authorization": "Bearer $token"},
          validateStatus: (_) => true,
        ),
      );

      Response response3 = await dio.get(
        "${baseUrl}api/doctors",
        options: Options(
          headers: {"Authorization": "Bearer $token"},
          validateStatus: (_) => true,
        ),
      );

      print('Response: ${response3.data}');

      print('Response: ${response2.data}');

      if (response3.statusCode == 200 && response2.statusCode == 200) {
        setState(() {
          loading = false;
          datalist2 = response3.data["data"] as List;
          datalist = response2.data["data"] as List;
          // if (datalist.isEmpty) {
          //   isEmpty = true;
          // } else {
          //   isEmpty = false;
          // }
        });
      } else {
        setState(() {
          loading = false;
        });
        AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          animType: AnimType.rightSlide,
          headerAnimationLoop: true,
          title: 'Error',
          desc: 'Please try again later',
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

  Widget _header() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          "Hello,",
        ),
        Text(prefs.getString("name").toString(),
            style: const TextStyle(
                fontSize: 28 * 1.2, fontWeight: FontWeight.bold)),
      ],
    ).p16;
  }

  Widget _searchField() {
    return Container(
      height: 55,
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(13)),
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: Colors.grey.withOpacity(.3),
            blurRadius: 15,
            offset: Offset(5, 5),
          )
        ],
      ),
      child: TextField(
        decoration: InputDecoration(
          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          border: InputBorder.none,
          hintText: "Search",
          suffixIcon: SizedBox(
              width: 50,
              child: Icon(Icons.search, color: Colors.purple)
                  .alignCenter
                  .ripple(() {}, borderRadius: BorderRadius.circular(13))),
        ),
      ),
    );
  }

  Color randomColor2() {
    var random = Random();
    final colorList = [
      LightColor.green,
      LightColor.skyBlue,
      LightColor.orange,
    ];
    var color = colorList[random.nextInt(colorList.length)];
    return color;
  }

  String randomImage() {
    var random = Random();
    final imageList = [
      "assets/docs/doc1.jpg",
      "assets/docs/doc2.jpg",
      "assets/docs/doc3.jpg",
      "assets/docs/doc4.jpg",
      "assets/docs/doc5.jpg",
      "assets/docs/doc6.jpg"
    ];
    var image = imageList[random.nextInt(imageList.length)];
    return image;
  }

  Widget _category() {
    return Column(
      children: <Widget>[
        Padding(
          padding:
              const EdgeInsets.only(top: 8, right: 16, left: 16, bottom: 4),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text("Reports", style: TextStyles.title.bold),
              // Text(
              //   "See All",
              //   style: TextStyles.titleNormal
              //       .copyWith(color: Theme.of(context).primaryColor),
              // ).p(8).ripple(() {})
            ],
          ),
        ),
        CircularWidgetLoading(
          loading: loading,
          child: SizedBox(
            height: AppTheme.fullHeight(context) * .28,
            width: AppTheme.fullWidth(context),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: datalist == null ? 0 : datalist.length,
              itemBuilder: (context, index) {
                return _categoryCard(
                  datalist[index]["status"].toString(),
                  "Read more...",
                  chatContext: datalist[index],
                  name: datalist[index]["doctor"]["name"].toString(),
                  hospital: datalist[index]["doctor"]["hospital"].toString(),
                  reportId: datalist[index]["_id"].toString(),
                  date: datalist[index]["createdAt"].toString().substring(
                      0, datalist[index]["createdAt"].toString().indexOf('T')),
                  trestbps: datalist[index]["details"]["restingBloodPressure"]
                      .toString(),
                  chol:
                      datalist[index]["details"]["serumColesterol"].toString(),
                  fbs: datalist[index]["details"]["fastingBloodSugarLevel"]
                              .toString() ==
                          "0"
                      ? "false"
                      : "true",
                  thalach:
                      datalist[index]["details"]["maximumHeartRate"].toString(),
                  exang: datalist[index]["details"]["exerciseInducedAngina"]
                              .toString() ==
                          "0"
                      ? "No"
                      : "Yes",
                  oldPeak:
                      datalist[index]["details"]["stDepression"].toString(),
                  slope: datalist[index]["slope"].toString() == "0"
                      ? "Upsloping"
                      : datalist[index]["details"]["slope"].toString() == "1"
                          ? "flat"
                          : "Downsloping",
                  ca: datalist[index]["details"]["numberOfMajorVessels"]
                      .toString(),
                  cp: datalist[index]["details"]["chestPainType"].toString() ==
                          "0"
                      ? "Typical angina"
                      : datalist[index]["cp_3"].toString() == "1"
                          ? "Atypical angina"
                          : datalist[index]["cp_3"].toString() == "2"
                              ? "Non-anginal pain"
                              : "Asymptomatic",
                  restecg: datalist[index]["restecg_1"].toString() == "0"
                      ? "Normal"
                      : datalist[index]["restecg_1"].toString() == "1"
                          ? "having ST-T wave abnormality"
                          : "Showing probable or definite "
                              "left ventricular hypertrophy",
                  status: datalist[index]["status"],
                  color: randomColor2(),
                  confidencLevel: datalist[index]["confidenceLevel"].toDouble(),
                  cardioStatus: datalist[index]["cadioStatus"].toString(),
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  final ValueNotifier<double> _valueNotifier = ValueNotifier(0);

  Widget _categoryCard(
    String title,
    String subtitle, {
    required Color color,
    required var chatContext,
    required String cardioStatus,
    required String reportId,
    required String name,
    required String hospital,
    required String date,
    required double confidencLevel,
    required String trestbps,
    required String chol,
    required String fbs,
    required String thalach,
    required String exang,
    required String oldPeak,
    required String slope,
    required String ca,
    required String cp,
    required String restecg,
    required String status,
  }) {
    TextStyle titleStyle = TextStyles.title.bold.white;
    TextStyle subtitleStyle = TextStyles.body.bold.white;
    if (AppTheme.fullWidth(context) < 392) {
      titleStyle = TextStyles.body.bold.white;
      subtitleStyle = TextStyles.bodySm.bold.white;
    }

    String report = "Resting blood pressure is $trestbps, "
        "Serum cholesterol is $chol, "
        "Fasting blood sugar level is $fbs, "
        "Maximum heart rate is $thalach, "
        "Exercise-induced angina is $exang, "
        "T depression is $oldPeak."
        "slope of the peak exercise ST segment is $slope, "
        "Number of major vessels (0-4) colored by fluoroscopy is/are $ca, "
        "chest pain type is $cp, "
        "Resting electrocardiograph results is $restecg. \n\n"
        "Status: $status.";

    return FadeInRight(
      duration: const Duration(milliseconds: 1000),
      child: AspectRatio(
        aspectRatio: 6 / 8,
        child: Container(
          height: 280,
          width: AppTheme.fullWidth(context) * .3,
          margin: EdgeInsets.only(left: 10, right: 10, bottom: 20, top: 10),
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.all(Radius.circular(20)),
            boxShadow: <BoxShadow>[
              BoxShadow(
                offset: Offset(4, 4),
                blurRadius: 10,
                color: color,
              )
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.all(Radius.circular(20)),
            child: Container(
              child: Stack(
                children: <Widget>[
                  Positioned(
                    top: -20,
                    left: -20,
                    child: CircleAvatar(
                      backgroundColor: color == LightColor.green
                          ? LightColor.lightGreen.withOpacity(.8)
                          : color == LightColor.skyBlue
                              ? LightColor.lightBlue.withOpacity(.8)
                              : LightColor.lightOrange.withOpacity(.8),
                      radius: 60,
                    ),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Flexible(
                        child: Text(title, style: titleStyle).hP8,
                      ),
                      SizedBox(height: 10),
                      Flexible(
                        child: Text(
                          subtitle,
                          style: subtitleStyle,
                        ).hP8,
                      ),
                    ],
                  ).p16
                ],
              ),
            ),
          ).ripple(() {
            showModalBottomSheet(
                context: context,
                showDragHandle: true,
                builder: (context) {
                  return Container(
                    decoration: const BoxDecoration(
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(20),
                          topRight: Radius.circular(20)),
                    ),
                    child: SingleChildScrollView(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          const ListTile(
                            title: Text('Report Details',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    fontSize: 15, fontWeight: FontWeight.bold)),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Container(
                              padding: EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.3),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20)),
                                boxShadow: <BoxShadow>[
                                  BoxShadow(
                                    offset: Offset(4, 4),
                                    blurRadius: 10,
                                    color: LightColor.grey.withOpacity(.5),
                                  ),
                                  BoxShadow(
                                    offset: Offset(-3, 0),
                                    blurRadius: 15,
                                    color: LightColor.grey.withOpacity(.1),
                                  )
                                ],
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Padding(
                                        padding: EdgeInsets.only(
                                            left: 8.0, right: 50),
                                        child: Text("ISSUED BY"),
                                      ),
                                      Text(
                                        "Dr. ${name.toUpperCase()}",
                                      ),
                                    ],
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Padding(
                                        padding: EdgeInsets.only(
                                            left: 8.0, right: 100),
                                        child: Text("AT"),
                                      ),
                                      Text(
                                        hospital.toUpperCase(),
                                      ),
                                    ],
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Padding(
                                        padding: EdgeInsets.only(
                                            left: 8.0, right: 100),
                                        child: Text("ON"),
                                      ),
                                      Text(
                                        date,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Container(
                              padding: EdgeInsets.only(top: 10),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.3),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20)),
                                boxShadow: <BoxShadow>[
                                  BoxShadow(
                                    offset: Offset(4, 4),
                                    blurRadius: 10,
                                    color: LightColor.grey.withOpacity(.5),
                                  ),
                                  BoxShadow(
                                    offset: Offset(-3, 0),
                                    blurRadius: 15,
                                    color: LightColor.grey.withOpacity(.1),
                                  )
                                ],
                              ),
                              child: CircularSeekBar(
                                width: double.infinity,
                                height: 150,
                                interactive: false,
                                progress: confidencLevel,
                                barWidth: 8,
                                startAngle: 45,
                                sweepAngle: 270,
                                strokeCap: StrokeCap.butt,
                                progressGradientColors: const [
                                  Colors.red,
                                  Colors.orange,
                                  Colors.yellow,
                                  Colors.green,
                                  Colors.blue,
                                  Colors.indigo,
                                  Colors.purple
                                ],
                                innerThumbRadius: 5,
                                innerThumbStrokeWidth: 3,
                                innerThumbColor: Colors.white,
                                outerThumbRadius: 5,
                                outerThumbStrokeWidth: 10,
                                outerThumbColor: Colors.blueAccent,
                                dashWidth: 1,
                                dashGap: 2,
                                animation: true,
                                curves: Curves.bounceOut,
                                valueNotifier: _valueNotifier,
                                child: Center(
                                  child: ValueListenableBuilder(
                                      valueListenable: _valueNotifier,
                                      builder: (_, double value, __) => Column(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              Text(
                                                '${value.round()}%',
                                              ),
                                              const Text(
                                                'Confidence Level',
                                              ),
                                            ],
                                          )),
                                ),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Container(
                              padding: EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.3),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20)),
                                boxShadow: <BoxShadow>[
                                  BoxShadow(
                                    offset: Offset(4, 4),
                                    blurRadius: 10,
                                    color: LightColor.grey.withOpacity(.5),
                                  ),
                                  BoxShadow(
                                    offset: Offset(-3, 0),
                                    blurRadius: 15,
                                    color: LightColor.grey.withOpacity(.1),
                                  )
                                ],
                              ),
                              child: NumbersWidget(
                                heartRate: thalach,
                                cardioStatus: cardioStatus,
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Container(
                              padding: EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.3),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20)),
                                boxShadow: <BoxShadow>[
                                  BoxShadow(
                                    offset: Offset(4, 4),
                                    blurRadius: 10,
                                    color: LightColor.grey.withOpacity(.5),
                                  ),
                                  BoxShadow(
                                    offset: Offset(-3, 0),
                                    blurRadius: 15,
                                    color: LightColor.grey.withOpacity(.1),
                                  )
                                ],
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    "Summery",
                                    style:
                                        TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                  Text(report)
                                ],
                              ),
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: <Widget>[
                              Container(
                                height: 45,
                                width: 45,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: LightColor.grey.withAlpha(150)),
                                child: const Icon(
                                  Icons.share,
                                  color: Colors.white,
                                ),
                              ).ripple(
                                () {
                                  Share.share(report, subject: "Test result");
                                },
                                borderRadius: BorderRadius.circular(10),
                              ),
                              TextButton(
                                style: ButtonStyle(
                                  backgroundColor: MaterialStateProperty.all(
                                      LightColor.purple),
                                ),
                                onPressed: () async {
                                  late SharedPreferences prefs;
                                  prefs = await SharedPreferences.getInstance();

                                  String? token = prefs.getString('token');

                                  print(chatContext.toString());

                                  print("dio initialised");

                                  try {
                                    setState(() {
                                      loading = true;
                                    });

                                    num randomNumber =
                                        Random().nextInt(1000000 - 1) + 1;

                                    print("session creation initialised");
                                    Response response = await dio.post(
                                      "${baseUrl}api/chat-sessions/me",
                                      data: {
                                        "title":
                                            "Result ${reportId} chat $randomNumber",
                                        "medicalReport": reportId,
                                      },
                                      options: Options(
                                        headers: {
                                          "Authorization": "Bearer ${token!}"
                                        },
                                        validateStatus: (_) => true,
                                      ),
                                    );

                                    print('Response: ${response.data}');

                                    if (response.statusCode == 200) {
                                      setState(() {
                                        loading = false;
                                      });

                                      final jsonData = response.data;
                                      final sessionId = jsonData['data']['_id'];
                                      final patientId =
                                          jsonData['data']['patientId'];

                                      prefs.setString('sessionId', sessionId);
                                      prefs.setString('patientId', patientId);

                                      Navigator.of(context).push(
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  path.ChatScreen()));
                                    } else {
                                      setState(() {
                                        loading = false;
                                      });
                                      AwesomeDialog(
                                        context: context,
                                        dialogType: DialogType.error,
                                        animType: AnimType.rightSlide,
                                        headerAnimationLoop: true,
                                        title: 'Error',
                                        desc: 'Please try again later',
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
                                      desc: "Please try again later",
                                      btnOkOnPress: () {},
                                      btnOkIcon: Icons.cancel,
                                      btnOkColor: Colors.red,
                                    ).show();
                                    print('Error : $e');
                                  }
                                },
                                child: const Text(
                                  "Consult bot",
                                  style: TextStyle(color: Colors.white),
                                ).p(8),
                              ),
                            ],
                          ).vP16,
                        ],
                      ),
                    ),
                  );
                });
          }, borderRadius: BorderRadius.all(Radius.circular(20))),
        ),
      ),
    );
  }

  Widget _doctorsList() {
    return SliverList(
      delegate: SliverChildListDelegate([
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Text("Doctors", style: TextStyles.title.bold),
            // IconButton(
            //     icon: Icon(
            //       Icons.sort,
            //       color: Theme.of(context).primaryColor,
            //     ),
            //     onPressed: () {})
            // .p(12).ripple(() {}, borderRadius: BorderRadius.all(Radius.circular(20))),
          ],
        ).hP16,
        CircularWidgetLoading(
          loading: loading,
          child: Container(
            height: MediaQuery.of(context).size.height * 0.4,
            child: ListView.builder(
                shrinkWrap: true,
                itemCount: datalist2 == null ? 0 : datalist2.length,
                itemBuilder: (context, index) {
                  return _doctorTile(datalist2[index]);
                }),
          ),
          // Container(
          //   width: AppTheme.fullWidth(context),
          //   child: datalist2 == null ?
          //       SizedBox()
          //   : VerticalCardPager(
          //     textStyle:
          //         TextStyle(backgroundColor: Colors.white.withOpacity(0.3)),
          //     titles: datalist2
          //         .map<String>((e) =>
          //             (e['firstName'] as String).toUpperCase() +
          //             ' ' +
          //             (e['lastName'] as String).toUpperCase())
          //         .toList(),
          //     images: datalist2
          //         .map<Widget>((e) => Hero(
          //               tag: e['firstName'].toUpperCase() +
          //                   ' ' +
          //                   e['lastName'].toUpperCase(),
          //               child: ClipRRect(
          //                 borderRadius: BorderRadius.circular(20.0),
          //                 child: Image.asset(
          //                   randomImage(),
          //                   fit: BoxFit.cover,
          //                 ),
          //               ),
          //             ))
          //         .toList(),
          //     onPageChanged: (page) {},
          //     onSelectedItem: (index) {
          //       Navigator.of(context).push(MaterialPageRoute(
          //           builder: (context) => DetailPage(model: datalist2[index])));
          //     },
          //   ),
          //   // ListView.builder(
          //   //     shrinkWrap: true,
          //   //     itemCount: datalist2 == null ? 0 :  datalist2.length,
          //   //     itemBuilder: (context, index) {
          //   //       return _doctorTile(
          //   //           datalist2[index]
          //   //       );
          //   //     }
          //   // ),
          // ),
        )
      ]),
    );
  }

  Widget getdoctorWidgetList() {
    return Column(
        children: datalist2.map((x) {
      return _doctorTile(x);
    }).toList());
  }

  Widget _doctorTile(var doctor) {
    return FadeInUp(
      duration: const Duration(milliseconds: 1000),
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.3),
          borderRadius: BorderRadius.all(Radius.circular(20)),
          boxShadow: <BoxShadow>[
            BoxShadow(
              offset: Offset(4, 4),
              blurRadius: 10,
              color: LightColor.grey.withOpacity(.2),
            ),
            BoxShadow(
              offset: Offset(-3, 0),
              blurRadius: 15,
              color: LightColor.grey.withOpacity(.1),
            )
          ],
        ),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 18, vertical: 8),
          child: ListTile(
            contentPadding: EdgeInsets.all(0),
            leading: ClipRRect(
              borderRadius: BorderRadius.all(Radius.circular(13)),
              child: Container(
                height: 55,
                width: 55,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15),
                  color: randomColor(),
                ),
                child: Image.asset(
                  "assets/images/medical.png",
                  height: 50,
                  width: 50,
                  fit: BoxFit.contain,
                ),
              ),
            ),
            title: Text("${"Dr. " + doctor["name"]} ",
                style: TextStyles.title.bold),
            subtitle: Text(
              doctor["hospital"] ?? "",
              style: TextStyle(color: Colors.black38),
            ),
            trailing: Icon(
              Icons.keyboard_arrow_right,
              size: 30,
              color: Theme.of(context).primaryColor,
            ),
          ),
        ).ripple(() {
          Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DetailPage(model: doctor)));

          // Navigator.pushNamed(context, "/DetailPage", arguments: model);
        }, borderRadius: BorderRadius.all(Radius.circular(20))),
      ),
    );
  }

  Color randomColor() {
    var random = Random();
    final colorList = [
      Theme.of(context).primaryColor,
      LightColor.orange,
      LightColor.green,
      LightColor.grey,
      LightColor.lightOrange,
      LightColor.skyBlue,
      LightColor.titleTextColor,
      Colors.red,
      Colors.brown,
      LightColor.purpleExtraLight,
      LightColor.skyBlue,
    ];
    var color = colorList[random.nextInt(colorList.length)];
    return color;
  }

  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      drawer: Drawer(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Material(
                color: Colors.blueAccent,
                child: InkWell(
                  onTap: () {
                    /// Close Navigation drawer before
                    Navigator.pop(context);
                    // Navigator.push(context, MaterialPageRoute(builder: (context) => UserProfile()),);
                  },
                  child: Container(
                    width: double.maxFinite,
                    padding: EdgeInsets.only(
                        top: MediaQuery.of(context).padding.top, bottom: 24),
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 52,
                          backgroundImage:
                              AssetImage(ImageConstant.imgEllipse1),
                        ),
                        const SizedBox(
                          height: 12,
                        ),
                        Text(
                          prefs.getString("name").toString(),
                          style: const TextStyle(
                              fontSize: 28, color: Colors.white),
                        ),
                        Text(
                          prefs.getString("email").toString(),
                          style: const TextStyle(
                              fontSize: 14, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Column(
                children: [
                  ListTile(
                    leading: Icon(Icons.home_outlined),
                    title: Text('Home'),
                    onTap: () {
                      /// Close Navigation drawer before
                      Navigator.pop(context);
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.android_outlined),
                    title: const Text('Chat bot'),
                    onTap: () {
                      /// Close Navigation drawer before
                      Navigator.pop(context);
                      Navigator.of(context).pushNamed(AppRoutes.chatScreen);
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.calendar_month_outlined),
                    title: const Text('Appointments'),
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.of(context).pushNamed(AppRoutes.appointments);
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.person),
                    title: const Text('Account'),
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.of(context).pushNamed(AppRoutes.profile);
                    },
                  ),
                  const Divider(
                    color: Colors.black45,
                  ),
                  ListTile(
                    leading: const Icon(Icons.logout),
                    title: const Text('Logout'),
                    onTap: () async {
                      var cleared = await prefs.clear();
                      if (cleared == true) {
                        Navigator.of(context).pushNamedAndRemoveUntil(
                            AppRoutes.initialRoute, (route) => false);
                      }
                    },
                  ),
                ],
              )
            ],
          ),
        ),
      ),
      appBar: AppBar(
        elevation: 0,
        leading: GestureDetector(
          onTap: () {
            _scaffoldKey.currentState?.openDrawer();
          },
          child: const Icon(
            Icons.short_text,
            size: 30,
          ),
        ),
        actions: <Widget>[
          const Icon(
            Icons.notifications_none,
            size: 30,
          ),
          GestureDetector(
            onTap: () {
              Navigator.of(context).pushNamed(AppRoutes.profile);
            },
            child: ClipRRect(
              borderRadius: BorderRadius.all(Radius.circular(13)),
              child: Container(
                // height: 40,
                // width: 40,
                decoration: BoxDecoration(
                  color: Theme.of(context).backgroundColor,
                ),
                child: Image.asset(ImageConstant.imgEllipse1, fit: BoxFit.fill),
              ),
            ).p(8),
          ),
        ],
      ),
      backgroundColor: Theme.of(context).backgroundColor,
      body: RefreshIndicator(
        onRefresh: () async {
          prefs = await SharedPreferences.getInstance();

          print("dio initialised");

          var token = prefs.getString("token");

          try {
            print("detail retrieval initialised");

            Response response2 = await dio.get(
              "${baseUrl}api/medical-reports/me",
              options: Options(
                headers: {"Authorization": "Bearer $token"},
                validateStatus: (_) => true,
              ),
            );

            Response response3 = await dio.get(
              "${baseUrl}api/doctors",
              options: Options(
                headers: {"Authorization": "Bearer $token"},
                validateStatus: (_) => true,
              ),
            );

            print('Response: ${response3.data}');

            print('Response: ${response2.data}');

            if (response3.statusCode == 200 && response2.statusCode == 200) {
              setState(() {
                datalist2 = response3.data["data"] as List;
                datalist = response2.data["data"] as List;
                // if (datalist.isEmpty) {
                //   isEmpty = true;
                // } else {
                //   isEmpty = false;
                // }
              });
              Fluttertoast.showToast(
                  msg: "✔️ Page Refreshed",
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.BOTTOM,
                  timeInSecForIosWeb: 1,
                  fontSize: 16.0);
            } else {
              AwesomeDialog(
                context: context,
                dialogType: DialogType.error,
                animType: AnimType.rightSlide,
                headerAnimationLoop: true,
                title: 'Error',
                desc: 'Please try again later',
                btnOkOnPress: () {},
                btnOkIcon: Icons.cancel,
                btnOkColor: Colors.red,
              ).show();
            }
          } catch (e) {
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
        },
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: <Widget>[
            SliverList(
              delegate: SliverChildListDelegate(
                [
                  _header(),
                  // _searchField(),
                  _category(),
                ],
              ),
            ),
            _doctorsList()
          ],
        ),
      ),
    );
  }
}
