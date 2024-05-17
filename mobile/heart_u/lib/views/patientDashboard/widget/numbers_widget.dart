import 'package:flutter/material.dart';

import 'light_color.dart';

class NumbersWidget extends StatefulWidget {
  String heartRate;
  String cardioStatus;
  NumbersWidget({super.key, required this.heartRate, required this.cardioStatus});

  @override
  State<NumbersWidget> createState() => _NumbersWidgetState();
}

class _NumbersWidgetState extends State<NumbersWidget> {
  @override
  Widget build(BuildContext context) => Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      buildButton(context, widget.heartRate, 'Heart Rate', LightColor.purple),
      buildDivider(),
      buildButton(context, widget.cardioStatus == "1" ? "💔" : "💚", 'Cardio Status', Colors.pinkAccent),
      buildDivider(),
      buildButton(context, widget.cardioStatus == "1" ? "Unhealthy" : "Healthy",
          'Status', widget.cardioStatus == "1" ? Colors.red : Colors.green[600]!),
    ],
  );

  Widget buildDivider() => Container(
    height: 100,
    child: VerticalDivider(
      thickness: 1.5,
    ),
  );

  Widget buildButton(BuildContext context, String value, String text, Color color) =>
      MaterialButton(
        padding: EdgeInsets.symmetric(vertical: 4),
        onPressed: () {},
        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              textAlign: TextAlign.left,
              text,
            ),
            SizedBox(height: 2),
            Text(
              value,
              style: TextStyle(
                color: color,
                  fontWeight: FontWeight.bold,
                  fontSize: 24),
            ),
          ],
        ),
      );
}
