import 'dart:math';
import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:heart_u/core/app_export.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:widget_loading/widget_loading.dart';
import '../../../core/utils/constants.dart';
import '../../../theme/custom_button_style.dart';
import '../../../widgets/custom_elevated_button.dart';
import 'chat_view.dart';
import 'widgets/recentchatlist_item_widget.dart';

class BotHomeScreen extends StatefulWidget {
  const BotHomeScreen({super.key});

  @override
  State<BotHomeScreen> createState() => _BotHomeScreenState();
}

class _BotHomeScreenState extends State<BotHomeScreen> {

  final Dio dio = Dio();

  var loading = false;
  var isLoading = false;

  var dataList;

  late SharedPreferences prefs;

  Future<void> getData()async {
    prefs = await SharedPreferences.getInstance();

    print("dio initialised");

    var token = prefs.getString("token");

    try {

      setState(() {
        isLoading = true;
      });

      print("session retrieval initialised");
      Response response = await dio.get(
        "${baseUrl}api/chat-sessions/me",
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
          dataList = response.data["data"] as List;
        });

        setState(() {
          isLoading = false;
        });

        // final jsonData = response.data;
        // final name = jsonData['data']['name'];
        // final patientId = jsonData['data']['_id'];
        //
        // prefs.setString("userId", patientId);
        // prefs.setString("name", name);

      }else {
        setState(() {
          isLoading = false;
        });
        AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          animType: AnimType.rightSlide,
          headerAnimationLoop: true,
          title: 'Error',
          desc:
          'Please try again later',
          btnOkOnPress: () {},
          btnOkIcon: Icons.cancel,
          btnOkColor: Colors.red,
        ).show();
      }

    } catch (e) {
      setState(() {
        isLoading = false;
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

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          width: double.maxFinite,
          padding: EdgeInsets.symmetric(
            horizontal: 20.h,
            vertical: 31.v,
          ),
          child: Column(
            children: [
              _buildRecentChatColumn(context),
              SizedBox(height: 40.v),
              _buildRecentChatsRow(context),
              SizedBox(height: 18.v),
              _buildRecentChatList(context)
            ],
          ),
        ),
        bottomNavigationBar: _buildStartNewButton(context),
      ),
    );
  }

  /// Section Widget
  Widget _buildRecentChatColumn(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            BackButton(),
            Padding(
              padding: EdgeInsets.only(left: 3.h),
              child: const Text(
                "Chat with Hearty",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 18.v),
        Container(
          padding: EdgeInsets.symmetric(
            horizontal: 6.h,
            vertical: 5.v,
          ),
          decoration: AppDecoration.fillOnPrimaryContainer.copyWith(
            borderRadius: BorderRadiusStyle.roundedBorder12,
          ),
          child: FadeIn(
            duration: const Duration(milliseconds: 1000),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                GestureDetector(
                  onTap: (){
                    getData();
                  },
                  child: Image.asset(
                     "assets/images/Frame2.png",
                    height: 60.adaptSize,
                    width: 60.adaptSize,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(
                    left: 20.h,
                    top: 15.v,
                    bottom: 12.v,
                  ),
                  child: Column(
                    children: [
                      Text(
                        "Hearty is online and ready to chat \n"
                            "Tap on bot to refresh sessions",
                        style: theme.textTheme.titleSmall,
                      ),
                      SizedBox(height: 12.v),
                    ],
                  ),
                ),
                FadeIn(
                  delay: const Duration(seconds: 1),
                  child: Container(
                    height: 15.adaptSize,
                    width: 15.adaptSize,
                    margin: EdgeInsets.only(
                      left: 7.h,
                      bottom: 75.v,
                    ),
                    decoration: BoxDecoration(
                      color: appTheme.lightGreenA700E5,
                      borderRadius: BorderRadius.circular(
                        7.h,
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        )
      ],
    );
  }

  /// Section Widget
  Widget _buildRecentChatsRow(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 3.h),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "Recent  chats",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18,
            ),
          ),
        ],
      ),
    );
  }

  /// Section Widget
  Widget _buildRecentChatList(BuildContext context) {
    return Expanded(
      child: CircularWidgetLoading(
        loading: isLoading,
        child: RefreshIndicator(
          onRefresh: ()async{
            getData();
          },
          child: ListView.separated(
            physics: const AlwaysScrollableScrollPhysics(),
            shrinkWrap: false,
            separatorBuilder: (context, index) {
              return SizedBox(
                height: 10.v,
              );
            },
            itemCount: dataList == null ? 0 :  dataList.length,
            itemBuilder: (context, index) {
              return GestureDetector(
                onTap: () async {
                  prefs.setString("sessionId", dataList[index]["_id"]);
                  prefs.setString("patientId", dataList[index]["patientId"]);

                  try{

                    String sessionId = dataList[index]["_id"];
                    prefs = await SharedPreferences.getInstance();

                    var token = prefs.getString("token");

                    setState(() {
                      isLoading = true;
                    });

                    print("session messages retrieval initialised");
                    Response response = await dio.get(
                      "${baseUrl}api/chat-messages/$sessionId",
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
                          isLoading = false;
                      });

                      var messages = response.data["data"] as List;

                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => ChatScreen(sessionMessages: messages,))
                        );

                    } else{

                      setState(() {
                          isLoading = false;
                      });

                       AwesomeDialog(
                        context: context,
                        dialogType: DialogType.error,
                        animType: AnimType.rightSlide,
                        headerAnimationLoop: true,
                        title: 'Error',
                        desc:
                        'An error occurred while fetching messages. Please try again later',
                        btnOkOnPress: () {},
                        btnOkIcon: Icons.cancel,
                        btnOkColor: Colors.red,
                      ).show();
                    }


                  } catch (e){
                    print('Response: $e');

                      setState(() {
                          isLoading = false;
                      });
                    AwesomeDialog(
                        context: context,
                        dialogType: DialogType.error,
                        animType: AnimType.rightSlide,
                        headerAnimationLoop: true,
                        title: 'Error',
                        desc:
                        'Please try again later',
                        btnOkOnPress: () {},
                        btnOkIcon: Icons.cancel,
                        btnOkColor: Colors.red,
                      ).show();

                  }
                },
                child: RecentchatlistItemWidget(
                  date: dataList[index]["createdAt"],
                  title: dataList[index]["title"],
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  /// Section Widget
  Widget _buildStartNewButton(BuildContext context) {
    return BounceInDown(
      duration: const Duration(milliseconds: 1000),
      child: CircularWidgetLoading(
        loading: loading,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
          child: CustomElevatedButton(
            onPressed: () async {

              String? token = prefs.getString('token');

              print("dio initialised");


              try {

                setState(() {
                  loading = true;
                });

                num randomNumber = Random().nextInt(1000000 - 1) + 1;

                print("session creation initialised");
                Response response = await dio.post(
                  "${baseUrl}api/chat-sessions/me",
                  data: {
                    "title" : randomNumber.toString(),
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

                  final jsonData = response.data;
                  final sessionId = jsonData['data']['_id'];
                  final patientId = jsonData['data']['patientId'];

                  prefs.setString('sessionId', sessionId);
                  prefs.setString('patientId', patientId);

                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => ChatScreen()));

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
                    'Please try again later',
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

            },
            height: 43.v,
            text: "Start new conversation",
            buttonStyle: CustomButtonStyles.fillPinkA,
          ),
        ),
      ),
    );
  }
}
