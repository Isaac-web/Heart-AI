import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../routes/app_routes.dart';
import '../model/user.dart';
import '../utils/user_preferences.dart';
import '../widget/appbar_widget.dart';
import '../widget/button_widget.dart';
import '../widget/numbers_widget.dart';
import '../widget/profile_widget.dart';
import 'edit_profile.dart';

class ProfilePage extends StatefulWidget {
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {

  late String name;
  late String email;
  late String sex;
  late String age;
  late String id;
  late String fSex;
  Future<void> initShare() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  setState(() {
    name = prefs.getString("name").toString();
    email = prefs.getString("email").toString();
    sex = prefs.getString("sex").toString();
    age = prefs.getString("age").toString();
    id = prefs.getString("userId").toString();
    fSex = sex == "0" ? "Male" : "Female";
  });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    initShare();
  }
  @override
  Widget build(BuildContext context) {
    final user = UserPreferences.myUser;

    return Scaffold(
          appBar: buildAppBar(context),
          body: RefreshIndicator(
            onRefresh: () async {
              initShare();
            },
            child: ListView(
              scrollDirection: Axis.vertical,
              physics: BouncingScrollPhysics(),
              children: [
                ProfileWidget(
                  imagePath: user.imagePath,
                  onClicked: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => EditProfilePage(
                        name: name,
                        sex: sex,
                        age: age,
                      )),
                    );
                  },
                ),
                const SizedBox(height: 24),
                buildName(user),
                const SizedBox(height: 24),
                Center(child: buildUpgradeButton()),
                const SizedBox(height: 24),
                NumbersWidget(),
                const SizedBox(height: 48),
                buildAbout(user),
              ],
            ),
          ),
    );
  }

  Widget buildName(User user) => Column(
        children: [
          Text(
            name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          const SizedBox(height: 4),
          Text(
            email,
            style: const TextStyle(color: Colors.grey),
          )
        ],
      );

  Widget buildUpgradeButton() => ButtonWidget(
        text: 'Logout',
        onClicked: () async {
          final SharedPreferences prefs = await SharedPreferences.getInstance();
          var cleared = await prefs.clear();
          if (cleared == true){

            Navigator.of(context).pushNamedAndRemoveUntil(
                AppRoutes.initialRoute,
                    (route) => false);
          }
        },
      );

  Widget buildAbout(User user) => Container(
        padding: EdgeInsets.symmetric(horizontal: 48),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'About',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Text(
              "ID: $id \n"
                  "Name: $name \n"
                  "Email: $email \n"
                  "Age: $age \n"
                  "Sex: $fSex",
              style: TextStyle(fontSize: 16, height: 1.4),
            ),
          ],
        ),
      );
}
