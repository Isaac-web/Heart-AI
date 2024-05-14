import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class NumbersWidget extends StatefulWidget {
  @override
  State<NumbersWidget> createState() => _NumbersWidgetState();
}

class _NumbersWidgetState extends State<NumbersWidget> {

  String age = "loading...";
  String sex = "loading...";
  String phone = "loading...";
  initShare() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      age = prefs.getString("age").toString();
      sex = prefs.getString("sex").toString();
      phone = prefs.getString("phone").toString();
    });
  }


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    initShare();
  }

  @override
  Widget build(BuildContext context) => Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          buildButton(context, age == "0" ? "45" : age, 'Age'),
          buildDivider(),
          buildButton(context, phone == "" ? "0501234567" : phone, 'Phone'),
          buildDivider(),
          buildButton(context, sex == "1" ? "Male" : "Female", 'Sex'),
        ],
      );

  Widget buildDivider() => Container(
        height: 24,
        child: VerticalDivider(),
      );

  Widget buildButton(BuildContext context, String value, String text) =>
      MaterialButton(
        padding: EdgeInsets.symmetric(vertical: 4),
        onPressed: () {},
        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Text(
              value,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            SizedBox(height: 2),
            Text(
              text,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      );
}
