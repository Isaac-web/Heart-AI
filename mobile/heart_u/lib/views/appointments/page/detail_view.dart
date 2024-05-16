import 'package:flutter/material.dart';
import '../constant/constant.dart';

class DetailView extends StatefulWidget {
   var data;
  final String image;

  DetailView({required this.data, required this.image});

  @override
  _DetailViewState createState() => _DetailViewState(data: data, image: image);
}

class _DetailViewState extends State<DetailView> with TickerProviderStateMixin {
   var data;
  final String image;

  _DetailViewState({required this.data, required this.image});

  bool init = false;


  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();

    controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 1),
    );

    Tween<double> tween = Tween(begin: 0.0, end: 400.0);

    animation = tween
        .animate(CurvedAnimation(parent: controller, curve: Curves.easeInExpo))
      ..addListener(() {
        setState(() {});
      });

    controller.forward();

    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        init = true;
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgoundColor,
      body: Stack(
        children: [
          Center(
            child: ConstrainedBox(
              constraints: BoxConstraints(maxWidth: 500),
              child: LayoutBuilder(builder: (context, constraints) {
                final maxWidth = constraints.maxWidth;

                return Stack(children: [
                  Stack(
                    children: [
                      Hero(
                        tag: (data["doctor"]["name"]).toUpperCase(),
                        child: Image.asset(
                          image,
                          fit: BoxFit.fitWidth,
                          width: double.infinity,
                        ),
                      ),
                      AnimatedOpacity(
                        opacity: init ? 1 : 0,
                        duration: Duration(milliseconds: 500),
                        child: Container(
                          width: maxWidth,
                          height: maxWidth,
                          decoration: BoxDecoration(
                            gradient: RadialGradient(
                              colors: [
                                backgoundColor.withOpacity(0.0),
                                backgoundColor.withOpacity(0.0),
                                backgoundColor.withOpacity(0.0),
                                backgoundColor,
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: Stack(
                      children: [
                        Container(
                            padding: EdgeInsets.only(
                                left: 15, right: 15, bottom: 20),
                            width: double.infinity,
                            height: 320,
                            child: Stack(
                              children: [
                                AnimatedBorder(animation: animation),
                                Align(
                                  alignment: Alignment.center,
                                  child: AnimatedOpacity(
                                    opacity: init ? 1 : 0,
                                    duration: Duration(milliseconds: 500),
                                    child: Padding(
                                      padding: const EdgeInsets.only(top: 50.0),
                                      child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.spaceEvenly,
                                              children: <Widget>[
                                                Column(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .center,
                                                    children: [
                                                      Text("STATUS",
                                                          style: textTheme
                                                              .titleSmall),
                                                      Text(
                                                         data["status"].toString(),
                                                          style: textTheme
                                                              .titleSmall
                                                              ?.copyWith(
                                                                  color: Color(
                                                                      0xffAE914B)))
                                                    ]),
                                                Column(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment.center,
                                                  children: <Widget>[
                                                    Text(
                                                      "DATE",
                                                      style:
                                                          textTheme.titleSmall,
                                                    ),
                                                    Text(
                                                        data["appointmentDate"]
                                                            .substring(0, data["appointmentDate"]
                                                            .toString().indexOf('T')),
                                                        style: textTheme
                                                            .titleSmall
                                                            ?.copyWith(
                                                                color: Color(
                                                                    0xffAE914B)))
                                                  ],
                                                )
                                              ],
                                            ),
                                            Padding(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      horizontal: 30.0),
                                              child: Divider(
                                                color: Colors.white,
                                                height: 1,
                                              ),
                                            ),
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  left: 20,
                                                  right: 20,
                                                  bottom: 30),
                                              child: Text((data["doctor"]["name"]).toUpperCase()+"\n"+
                                                  (data["doctor"]["hospital"]).toUpperCase() ==
                                                  "" ? "HOSPITAL NOT PROVIDED" :
                                              (data["doctor"]["hospital"]).toUpperCase()+"\n"+
                                                  data["appointmentDate"]
                                                      .substring(0, data["appointmentDate"]
                                                      .toString().indexOf('T'))+"\n"+
                                                  "BOOKED ON "+data["createdAt"].substring(0, data["createdAt"]
                                                  .toString().indexOf('T')),
                                                  style: textTheme.bodyLarge,
                                                  maxLines: 6,
                                                  overflow:
                                                      TextOverflow.ellipsis),
                                            )
                                          ]),
                                    ),
                                  ),
                                )
                              ],
                            )),
                      ],
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: AnimatedOpacity(
                      duration: Duration(milliseconds: 500),
                      opacity: init ? 1.0 : 0.0,
                      child: Container(
                        margin: EdgeInsets.only(bottom: 185),
                        width: double.infinity,
                        height: 270,
                        child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Text(
                                (data["doctor"]["hospital"]).toUpperCase() ==
                                    "" ? "HOSPITAL NOT PROVIDED" :
                                (data["doctor"]["hospital"]).toUpperCase(),
                                style: textTheme.titleMedium,
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              Text(
                                (data["doctor"]["name"]).toUpperCase(),
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge
                                    ?.copyWith(
                                        letterSpacing: 4 +
                                            25 *
                                                ((400 - animation.value) /
                                                    400.0)),
                              ),
                            ]),
                      ),
                    ),
                  ),
                ]);
              }),
            ),
          ),
          Padding(
              padding: EdgeInsets.only(left: 25, top: 25),
              child: CustomBackButton()),
        ],
      ),
    );
  }
}

class AnimatedBorder extends StatelessWidget {
  const AnimatedBorder({
    required this.animation,
  });

  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      return AnimatedBuilder(
        animation: animation,
        builder: (context, snapshot) {
          return CustomPaint(
            painter: MyPainter(value: animation.value),
            child: Container(
              width: constraints.maxWidth,
              height: constraints.maxHeight,
            ),
          );
        },
      );
    });
  }
}

class CustomBackButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
          color: Colors.grey[100]?.withOpacity(0.3), shape: BoxShape.circle),
      child: InkWell(
        child: Icon(
          Icons.arrow_back_ios,
          color: Colors.white,
        ),
        onTap: () {
          Navigator.pop(context);
        },
      ),
    );
  }
}

class MyPainter extends CustomPainter {
  final double value;

  MyPainter({required this.value});

  final paintBorder = Paint()
    ..color = Colors.white30
    ..style = PaintingStyle.stroke
    ..strokeWidth = 1.0;

  final transparentBorder = Paint()
    ..color = Colors.transparent
    ..style = PaintingStyle.stroke
    ..strokeWidth = 1.0;

  @override
  void paint(Canvas canvas, Size size) {
    var path = Path();

    if (value < 15) {
      double lineValue = size.width * value / 100;
      path.lineTo(lineValue, 0);
      canvas.drawPath(path, paintBorder);
      return;
    } else {
      path.lineTo(size.width * 15 / 100, 0);
      canvas.drawPath(path, paintBorder);
    }

    path = Path();
    path.moveTo(size.width * 15 / 100, 0);

    if (value >= 15 && value <= 85) {
      double lineValue = size.width * value / 100;
      path.lineTo(lineValue, 0);
      canvas.drawPath(path, transparentBorder);
      return;
    } else {
      path.lineTo(size.width * 85 / 100, 0);
      canvas.drawPath(path, transparentBorder);
    }

    path = Path();
    path.moveTo(size.width * 85 / 100, 0);

    if (value > 85 && value < 100) {
      double lineValue = size.width * value / 100;
      path.lineTo(lineValue, 0);
      canvas.drawPath(path, paintBorder);
      return;
    } else {
      path.lineTo(size.width, 0);
      canvas.drawPath(path, paintBorder);
    }

    if (value < 200) {
      double lineValue = size.height * (value - 100) / 100;
      path.lineTo(size.width, lineValue);
      canvas.drawPath(path, paintBorder);
      return;
    } else {
      path.lineTo(size.width, size.height);
      canvas.drawPath(path, paintBorder);
    }

    path = Path();
    path.moveTo(size.width, size.height);

    if (value < 300) {
      double lineValue = size.width - size.width * (value - 200) / 100;
      path.lineTo(lineValue, size.height);
      canvas.drawPath(path, paintBorder);
      return;
    } else {
      path.lineTo(0, size.height);
      canvas.drawPath(path, paintBorder);
    }

    path = Path();
    path.moveTo(0, size.height);

    if (value < 400) {
      double lineValue = size.height - size.height * (value - 300) / 100;
      path.lineTo(0, lineValue);
      canvas.drawPath(path, paintBorder);
      return;
    } else {
      path.lineTo(0, 0);
      canvas.drawPath(path, paintBorder);
    }
  }

  @override
  bool shouldRepaint(CustomPainter old) {
    return false;
  }
}
