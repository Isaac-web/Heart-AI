import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rive/rive.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../core/utils/constants.dart';
import '../../onboarding/widget/sign_in_form.dart';
import '../model/user.dart';
import '../utils/user_preferences.dart';
import '../widget/appbar_widget.dart';
import '../widget/profile_widget.dart';
import '../widget/textfield_widget.dart';

class EditProfilePage extends StatefulWidget {
  String name;
  String age;
  String sex;
  EditProfilePage({super.key, required this.name, required this.sex,
    required this.age});

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {

  TextEditingController nameController = TextEditingController();
  TextEditingController ageController = TextEditingController();

  bool isShowLoading = false;
  bool isShowConfetti = false;

  late SMITrigger check;
  late SMITrigger error;
  late SMITrigger reset;

  late SMITrigger confetti;

  final Dio dio = Dio();

  StateMachineController getRiveController(Artboard artboard) {
    StateMachineController? controller =
    StateMachineController.fromArtboard(artboard, "State Machine 1");
    artboard.addController(controller!);
    return controller;
  }

  User user = UserPreferences.myUser;

  int selectedOption = 1;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: buildAppBar(context),
    body: ListView(
      padding: EdgeInsets.symmetric(horizontal: 32),
      physics: BouncingScrollPhysics(),
      children: [
        ProfileWidget(
          imagePath: user.imagePath,
          isEdit: true,
          onClicked: () async {},
        ),
        const SizedBox(height: 24),
        TextFieldWidget(
          controller: nameController,
          label: 'Full Name',
          text: widget.name,
          onChanged: (name) {},
        ),
        const SizedBox(height: 24),
        TextFieldWidget(
          label: 'Age',
          text: widget.age,
          onChanged: (email) {},
          controller: ageController,
        ),
        const SizedBox(height: 24),

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
                      print(selectedOption);
                    });
                  },
                ),
              ),
            ]
        ),

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
            : const SizedBox(),

        const SizedBox(height: 10),

        ElevatedButton.icon(
            onPressed: () async {
                print("dio initialised");
                SharedPreferences prefs = await SharedPreferences.getInstance();

                var token = prefs.getString("token");

                try {

                  setState(() {
                    isShowLoading = true;
                    isShowConfetti = true;
                  });

                  print("session creation initialised");
                  Response response = await dio.patch(
                    "${baseUrl}api/users/me",
                    data: {
                      "name" : nameController.text,
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
                        nameController.text);

                    prefs.setString("age",
                        ageController.text.toString());

                    prefs.setString("sex",
                        selectedOption.toString());

                    check.fire();
                    Future.delayed(Duration(seconds: 2), () {
                      setState(() {
                        isShowLoading = false;
                      });
                      confetti.fire();
                    });

                    // final jsonData = response.data;
                    // final sessionId = jsonData['data']['_id'];
                    // final patientId = jsonData['data']['patientId'];
                    //
                    // prefs.setString('sessionId', sessionId);
                    // prefs.setString('patientId', patientId);


                  }else {
                    error.fire();
                    Future.delayed(Duration(seconds: 2), () {
                      setState(() {
                        isShowLoading = false;
                      });
                    });

                    Fluttertoast.showToast(
                        msg: " ❌ Details updated failed",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.CENTER,
                        timeInSecForIosWeb: 1,
                        fontSize: 16.0
                    );
                  }

                } catch (e) {
                  error.fire();
                  Future.delayed(Duration(seconds: 2), () {
                    setState(() {
                      isShowLoading = false;
                    });
                  });

                  Fluttertoast.showToast(
                      msg: " ❌ Details updated failed",
                      toastLength: Toast.LENGTH_SHORT,
                      gravity: ToastGravity.CENTER,
                      timeInSecForIosWeb: 1,
                      fontSize: 16.0
                  );

                  print('Error sending message: $e');
                }

              },
            style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFF77D8E),
                minimumSize: const Size(double.infinity, 56),
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(10),
                        topRight: Radius.circular(25),
                        bottomRight: Radius.circular(25),
                        bottomLeft: Radius.circular(25)))),
            icon: const Icon(
              Icons.save,
            ),
            label: const Text("Save")),
      ],
    ),
  );
}
