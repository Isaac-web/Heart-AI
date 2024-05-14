import 'dart:math';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import 'package:heart_u/views/appointments/page/detail_view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vertical_card_pager/vertical_card_pager.dart';
import 'package:widget_loading/widget_loading.dart';

import '../../core/utils/constants.dart';
import 'model/champion.dart';

class AppointmentsPage extends StatefulWidget {
  @override
  _AppointmentsPageState createState() => _AppointmentsPageState();
}

class _AppointmentsPageState extends State<AppointmentsPage> {
  late SharedPreferences prefs;
  final Dio dio = Dio();
  bool loading = false;
  var datalist;

  String randomImage() {
    var random = Random();
    final imageList = [
      "assets/bg/h1.jpg",
      "assets/bg/h2.jpg",
      "assets/bg/h3.jpg",
      "assets/bg/h4.jpg",
      "assets/bg/h5.jpg",
      "assets/bg/h6.jpg",
      "assets/bg/h7.jpg",
      "assets/bg/h8.jpg",
      "assets/bg/h9.jpg",
      "assets/bg/h10.jpg"
    ];
    var image = imageList[random.nextInt(imageList.length)];
    return image;
  }

  Future<void> getData() async {
    prefs = await SharedPreferences.getInstance();

    print("dio initialised");

    var token = prefs.getString("token");
    String email = prefs.getString("email").toString();
    String pass = prefs.getString("password").toString();

    try {
      setState(() {
        loading = true;
      });

      print("detail retrieval initialised");

      Response response2 = await dio.get(
        "${baseUrl}api/medical-reports/requests/me",
        data: {
          "email": email,
          "password": pass,
        },
        options: Options(
          headers: {"Authorization": "Bearer $token"},
          validateStatus: (_) => true,
        ),
      );

      print('Response: ${response2.data}');

      if (response2.statusCode == 200) {
        setState(() {
          loading = false;
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
    super.initState();
    getData();
  }

  @override
  Widget build(BuildContext context) {
    final champions = championsMap.values.toList();

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Row(
              children: [
                const BackButton(),
                Padding(
                  padding: EdgeInsets.only(left: 3.h),
                  child: const Text(
                    "Appointments",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: CircularWidgetLoading(
                loading: loading,
                child: Container(
                  child: datalist == null ?
                  const SizedBox( height: 100, width: 100,) :
                  VerticalCardPager(
                    textStyle: TextStyle(
                        backgroundColor: Colors.white.withOpacity(0.3)),
                    titles: datalist
                        .map<String>((e) =>
                            (e["doctor"]['firstName'] as String).toUpperCase() +
                            ' ' +
                            (e["doctor"]['lastName'] as String).toUpperCase())
                        .toList(),
                    images: datalist
                        .map<Widget>((e) => Hero(
                              tag: (e["doctor"]['firstName'] as String)
                                      .toUpperCase() +
                                  ' ' +
                                  (e["doctor"]['lastName'] as String)
                                      .toUpperCase(),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(20.0),
                                child: Image.asset(
                                  randomImage(),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ))
                        .toList(),
                    onPageChanged: (page) {},
                    onSelectedItem: (index) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => DetailView(
                                  data: datalist[index],
                                  image: randomImage(),
                                )),
                      );
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
