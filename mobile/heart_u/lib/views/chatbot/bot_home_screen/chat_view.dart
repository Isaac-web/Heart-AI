import 'dart:math';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:chatview/chatview.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/utils/constants.dart';
import '../data.dart';

class ChatScreen extends StatefulWidget {
  var chatContext;
  List? sessionMessages;
  ChatScreen({super.key, this.chatContext, this.sessionMessages});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  AppTheme theme = LightTheme();
  bool isDarkTheme = false;

  final Dio dio = Dio();

  final currentUser = ChatUser(
    id: '1',
    name: 'Flutter',
    profilePhoto: Data.profileImage,
  );
  final _chatController = ChatController(
    initialMessageList: Data.messageList,
    scrollController: ScrollController(),
    chatUsers: [
      ChatUser(
        id: '2',
        name: 'Hearty',
        profilePhoto: Data.profileImage,
      ),
    ],
  );

  @override
  void initState() {

   _chatController.initialMessageList.clear();

   _chatController.initialMessageList.add(
     Message(
      id: '1',
      message: "Welcome, how can I help you ?",
      createdAt: DateTime.now(),
      sendBy: '2',
      status: MessageStatus.read,
    ),
   );
  
    if (widget.sessionMessages != null){
      print(widget.sessionMessages);
      
      int index = 0;
      while(index < widget.sessionMessages!.length){
        
        int id = int.parse(Data.messageList.last.id) + 1;

         _chatController.addMessage(
            Message(
              id: id.toString(),
              createdAt: DateTime.now(),
              message: widget.sessionMessages![index]["text"],
              sendBy: widget.sessionMessages![index]["user"] != null ? currentUser.id : "2",
              messageType: MessageType.text,
            ),
          );

          index ++;
      }
      

    }
    super.initState();
  }

  void _showHideTypingIndicator() {
    _chatController.setTypingIndicator = !_chatController.showTypingIndicator;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ChatView(
        currentUser: currentUser,
        chatController: _chatController,
        onSendTap: _onSendTap,
        featureActiveConfig: const FeatureActiveConfig(
          lastSeenAgoBuilderVisibility: true,
          receiptsBuilderVisibility: true,
        ),
        chatViewState: ChatViewState.hasMessages,
        chatViewStateConfig: ChatViewStateConfiguration(
          loadingWidgetConfig: ChatViewStateWidgetConfiguration(
            loadingIndicatorColor: theme.outgoingChatBubbleColor,
          ),
          onReloadButtonTap: () {},
        ),
        typeIndicatorConfig: TypeIndicatorConfiguration(
          flashingCircleBrightColor: theme.flashingCircleBrightColor,
          flashingCircleDarkColor: theme.flashingCircleDarkColor,
        ),
        appBar: ChatViewAppBar(
          elevation: theme.elevation,
          backGroundColor: theme.appBarColor,
          profilePicture: Data.profileImage,
          backArrowColor: theme.backArrowColor,
          chatTitle: "Hearty",
          chatTitleTextStyle: TextStyle(
            color: theme.appBarTitleTextStyle,
            fontWeight: FontWeight.bold,
            fontSize: 18,
            letterSpacing: 0.25,
          ),
          userStatus: "online",
          userStatusTextStyle: const TextStyle(color: Colors.grey),
          actions: [
            IconButton(
              onPressed: _onThemeIconTap,
              icon: Icon(
                isDarkTheme
                    ? Icons.brightness_4_outlined
                    : Icons.dark_mode_outlined,
                color: theme.themeIconColor,
              ),
            ),

          //   // IconButton(
          //   //   tooltip: 'Toggle TypingIndicator',
          //   //   onPressed: _showHideTypingIndicator,
          //   //   icon: Icon(
          //   //     Icons.keyboard,
          //   //     color: theme.themeIconColor,
          //   //   ),
          //   // ),
          ],
        ),
        chatBackgroundConfig: ChatBackgroundConfiguration(
          messageTimeIconColor: theme.messageTimeIconColor,
          messageTimeTextStyle: TextStyle(color: theme.messageTimeTextColor),
          defaultGroupSeparatorConfig: DefaultGroupSeparatorConfiguration(
            textStyle: TextStyle(
              color: theme.chatHeaderColor,
              fontSize: 17,
            ),
          ),
          backgroundColor: theme.backgroundColor,
        ),
        sendMessageConfig: SendMessageConfiguration(
          imagePickerIconsConfig: ImagePickerIconsConfiguration(
            cameraIconColor: theme.cameraIconColor,
            galleryIconColor: theme.galleryIconColor,
          ),
          replyMessageColor: theme.replyMessageColor,
          defaultSendButtonColor: theme.sendButtonColor,
          replyDialogColor: theme.replyDialogColor,
          replyTitleColor: theme.replyTitleColor,
          textFieldBackgroundColor: theme.textFieldBackgroundColor,
          closeIconColor: theme.closeIconColor,
          textFieldConfig: TextFieldConfiguration(
            onMessageTyping: (status) {
              /// Do with status
              debugPrint(status.toString());
            },
            compositionThresholdTime: const Duration(seconds: 1),
            textStyle: TextStyle(color: theme.textFieldTextColor),
          ),
          micIconColor: theme.replyMicIconColor,
          voiceRecordingConfiguration: VoiceRecordingConfiguration(
            backgroundColor: theme.waveformBackgroundColor,
            recorderIconColor: theme.recordIconColor,
            waveStyle: WaveStyle(
              showMiddleLine: false,
              waveColor: theme.waveColor ?? Colors.white,
              extendWaveform: true,
            ),
          ),
        ),
        chatBubbleConfig: ChatBubbleConfiguration(
          outgoingChatBubbleConfig: ChatBubble(
            linkPreviewConfig: LinkPreviewConfiguration(
              backgroundColor: theme.linkPreviewOutgoingChatColor,
              bodyStyle: theme.outgoingChatLinkBodyStyle,
              titleStyle: theme.outgoingChatLinkTitleStyle,
            ),
            receiptsWidgetConfig:
            const ReceiptsWidgetConfig(showReceiptsIn: ShowReceiptsIn.all),
            color: theme.outgoingChatBubbleColor,
          ),
          inComingChatBubbleConfig: ChatBubble(
            linkPreviewConfig: LinkPreviewConfiguration(
              linkStyle: TextStyle(
                color: theme.inComingChatBubbleTextColor,
                decoration: TextDecoration.underline,
              ),
              backgroundColor: theme.linkPreviewIncomingChatColor,
              bodyStyle: theme.incomingChatLinkBodyStyle,
              titleStyle: theme.incomingChatLinkTitleStyle,
            ),
            textStyle: TextStyle(color: theme.inComingChatBubbleTextColor),
            onMessageRead: (message) {
              /// send your message reciepts to the other client
              debugPrint('Message Read');
            },
            senderNameTextStyle:
            TextStyle(color: theme.inComingChatBubbleTextColor),
            color: theme.inComingChatBubbleColor,
          ),
        ),
        replyPopupConfig: ReplyPopupConfiguration(
          backgroundColor: theme.replyPopupColor,
          buttonTextStyle: TextStyle(color: theme.replyPopupButtonColor),
          topBorderColor: theme.replyPopupTopBorderColor,
        ),
        reactionPopupConfig: ReactionPopupConfiguration(
          shadow: BoxShadow(
            color: isDarkTheme ? Colors.black54 : Colors.grey.shade400,
            blurRadius: 20,
          ),
          backgroundColor: theme.reactionPopupColor,
        ),
        messageConfig: MessageConfiguration(
          messageReactionConfig: MessageReactionConfiguration(
            backgroundColor: theme.messageReactionBackGroundColor,
            borderColor: theme.messageReactionBackGroundColor,
            reactedUserCountTextStyle:
            TextStyle(color: theme.inComingChatBubbleTextColor),
            reactionCountTextStyle:
            TextStyle(color: theme.inComingChatBubbleTextColor),
            reactionsBottomSheetConfig: ReactionsBottomSheetConfiguration(
              backgroundColor: theme.backgroundColor,
              reactedUserTextStyle: TextStyle(
                color: theme.inComingChatBubbleTextColor,
              ),
              reactionWidgetDecoration: BoxDecoration(
                color: theme.inComingChatBubbleColor,
                boxShadow: [
                  BoxShadow(
                    color: isDarkTheme ? Colors.black12 : Colors.grey.shade200,
                    offset: const Offset(0, 20),
                    blurRadius: 40,
                  )
                ],
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          imageMessageConfig: ImageMessageConfiguration(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 15),
            shareIconConfig: ShareIconConfiguration(
              defaultIconBackgroundColor: theme.shareIconBackgroundColor,
              defaultIconColor: theme.shareIconColor,
            ),
          ),
        ),
        profileCircleConfig: const ProfileCircleConfiguration(
          profileImageUrl: Data.profileImage,
        ),
        repliedMessageConfig: RepliedMessageConfiguration(
          backgroundColor: theme.repliedMessageColor,
          verticalBarColor: theme.verticalBarColor,
          repliedMsgAutoScrollConfig: RepliedMsgAutoScrollConfig(
            enableHighlightRepliedMsg: true,
            highlightColor: Colors.pinkAccent.shade100,
            highlightScale: 1.1,
          ),
          textStyle: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.25,
          ),
          replyTitleTextStyle: TextStyle(color: theme.repliedTitleTextColor),
        ),
        swipeToReplyConfig: SwipeToReplyConfiguration(
          replyIconColor: theme.swipeToReplyIconColor,
        ),
      ),
    );
  }

  void _onSendTap(String message, ReplyMessage replyMessage,
      MessageType messageType,
      ) async {

    SharedPreferences prefs = await SharedPreferences.getInstance();

    final id = int.parse(Data.messageList.last.id) + 1;
    _chatController.addMessage(
      Message(
        id: id.toString(),
        createdAt: DateTime.now(),
        message: message,
        sendBy: currentUser.id,
        replyMessage: replyMessage,
        messageType: messageType,
      ),
    );
    Future.delayed(const Duration(milliseconds: 300), () {
      _chatController.initialMessageList.last.setStatus =
          MessageStatus.undelivered;
    });
    Future.delayed(const Duration(seconds: 1), () {
      _chatController.initialMessageList.last.setStatus = MessageStatus.read;
    });

    String? token = prefs.getString('token');

    String? sessionId = prefs.getString('sessionId');

    print(token);
    print(widget.chatContext);

    print("dio initialised");

    try {
      _chatController.setTypingIndicator = true;
      num randomNumber = Random().nextInt(1000000 - 1) + 1;

      print("chat initialised");
      Response response = await dio.post(
        "${baseUrl}api/chat-messages",
        data: {
          "text" : message,
          "chatSessionId": sessionId == "" ? randomNumber.toString()
              : sessionId,
          "context": widget.chatContext ?? {"subject":"heart diseases"},
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

        _chatController.setTypingIndicator = false;

        final jsonData = response.data;
        final systemMessage = jsonData['data']['systemMessage'];

        _chatController.addMessage(
          Message(
            id: id.toString(),
            createdAt: DateTime.now(),
            message: systemMessage,
            sendBy: "2",
            replyMessage: replyMessage,
            messageType: messageType,
          ),
        );

      }else {
        _chatController.setTypingIndicator = false;

        AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          animType: AnimType.rightSlide,
          headerAnimationLoop: true,
          title: 'Error',
          desc:
          'An Error occurred please try again later',
          btnOkOnPress: () {},
          btnOkIcon: Icons.cancel,
          btnOkColor: Colors.red,
        ).show();
      }

    } catch (e) {
      _chatController.setTypingIndicator = false;

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

  void _onThemeIconTap() {
    setState(() {
      if (isDarkTheme) {
        theme = LightTheme();
        isDarkTheme = false;
      } else {
        theme = DarkTheme();
        isDarkTheme = true;
      }
    });
  }
}

class AppTheme {
  final Color? appBarColor;
  final Color? backArrowColor;
  final Color? backgroundColor;
  final Color? replyDialogColor;
  final Color? replyTitleColor;
  final Color? textFieldBackgroundColor;

  final Color? outgoingChatBubbleColor;

  final Color? inComingChatBubbleColor;

  final Color? inComingChatBubbleTextColor;
  final Color? repliedMessageColor;
  final Color? repliedTitleTextColor;
  final Color? textFieldTextColor;
  final Color? closeIconColor;
  final Color? shareIconBackgroundColor;
  final Color? sendButtonColor;
  final Color? cameraIconColor;
  final Color? galleryIconColor;
  final Color? recordIconColor;
  final Color? stopIconColor;
  final Color? swipeToReplyIconColor;
  final Color? replyMessageColor;
  final Color? appBarTitleTextStyle;
  final Color? messageReactionBackGroundColor;
  final Color? messageTimeIconColor;
  final Color? messageTimeTextColor;
  final Color? reactionPopupColor;
  final Color? replyPopupColor;
  final Color? replyPopupButtonColor;
  final Color? replyPopupTopBorderColor;
  final Color? reactionPopupTitleColor;
  final Color? flashingCircleDarkColor;
  final Color? flashingCircleBrightColor;
  final Color? waveformBackgroundColor;
  final Color? waveColor;
  final Color? replyMicIconColor;
  final Color? messageReactionBorderColor;

  final Color? verticalBarColor;
  final Color? chatHeaderColor;
  final Color? themeIconColor;
  final Color? shareIconColor;
  final double? elevation;
  final Color? linkPreviewIncomingChatColor;
  final Color? linkPreviewOutgoingChatColor;
  final TextStyle? linkPreviewIncomingTitleStyle;
  final TextStyle? linkPreviewOutgoingTitleStyle;
  final TextStyle? incomingChatLinkTitleStyle;
  final TextStyle? outgoingChatLinkTitleStyle;
  final TextStyle? outgoingChatLinkBodyStyle;
  final TextStyle? incomingChatLinkBodyStyle;

  AppTheme({
    this.cameraIconColor,
    this.galleryIconColor,
    this.flashingCircleDarkColor,
    this.flashingCircleBrightColor,
    this.outgoingChatLinkBodyStyle,
    this.incomingChatLinkBodyStyle,
    this.incomingChatLinkTitleStyle,
    this.outgoingChatLinkTitleStyle,
    this.linkPreviewOutgoingChatColor,
    this.linkPreviewIncomingChatColor,
    this.linkPreviewIncomingTitleStyle,
    this.linkPreviewOutgoingTitleStyle,
    this.repliedTitleTextColor,
    this.swipeToReplyIconColor,
    this.textFieldTextColor,
    this.reactionPopupColor,
    this.replyPopupButtonColor,
    this.replyPopupTopBorderColor,
    this.reactionPopupTitleColor,
    this.appBarColor,
    this.backArrowColor,
    this.backgroundColor,
    this.replyDialogColor,
    this.replyTitleColor,
    this.textFieldBackgroundColor,
    this.outgoingChatBubbleColor,
    this.inComingChatBubbleColor,
    this.inComingChatBubbleTextColor,
    this.repliedMessageColor,
    this.closeIconColor,
    this.shareIconBackgroundColor,
    this.sendButtonColor,
    this.replyMessageColor,
    this.appBarTitleTextStyle,
    this.messageReactionBackGroundColor,
    this.messageReactionBorderColor,
    this.verticalBarColor,
    this.chatHeaderColor,
    this.themeIconColor,
    this.shareIconColor,
    this.elevation,
    this.messageTimeIconColor,
    this.messageTimeTextColor,
    this.replyPopupColor,
    this.recordIconColor,
    this.stopIconColor,
    this.waveformBackgroundColor,
    this.waveColor,
    this.replyMicIconColor,
  });
}

class DarkTheme extends AppTheme {
  DarkTheme({
    Color super.flashingCircleDarkColor = Colors.grey,
    Color super.flashingCircleBrightColor = const Color(0xffeeeeee),
    TextStyle super.incomingChatLinkTitleStyle = const TextStyle(color: Colors.black),
    TextStyle super.outgoingChatLinkTitleStyle = const TextStyle(color: Colors.white),
    TextStyle super.outgoingChatLinkBodyStyle = const TextStyle(color: Colors.white),
    TextStyle super.incomingChatLinkBodyStyle = const TextStyle(color: Colors.white),
    double super.elevation = 1,
    Color super.repliedTitleTextColor = Colors.white,
    super.swipeToReplyIconColor = Colors.white,
    Color super.textFieldTextColor = Colors.white,
    Color super.appBarColor = const Color(0xff1d1b25),
    Color super.backArrowColor = Colors.white,
    Color super.backgroundColor = const Color(0xff272336),
    Color super.replyDialogColor = const Color(0xff272336),
    Color super.linkPreviewOutgoingChatColor = const Color(0xff272336),
    Color super.linkPreviewIncomingChatColor = const Color(0xff9f85ff),
    TextStyle super.linkPreviewIncomingTitleStyle = const TextStyle(),
    TextStyle super.linkPreviewOutgoingTitleStyle = const TextStyle(),
    Color super.replyTitleColor = Colors.white,
    Color super.textFieldBackgroundColor = const Color(0xff383152),
    Color super.outgoingChatBubbleColor = const Color(0xff9f85ff),
    Color super.inComingChatBubbleColor = const Color(0xff383152),
    Color super.reactionPopupColor = const Color(0xff383152),
    Color super.replyPopupColor = const Color(0xff383152),
    Color super.replyPopupButtonColor = Colors.white,
    Color super.replyPopupTopBorderColor = Colors.black54,
    Color super.reactionPopupTitleColor = Colors.white,
    Color super.inComingChatBubbleTextColor = Colors.white,
    Color super.repliedMessageColor = const Color(0xff9f85ff),
    Color super.closeIconColor = Colors.white,
    Color super.shareIconBackgroundColor = const Color(0xff383152),
    Color super.sendButtonColor = Colors.white,
    Color super.cameraIconColor = const Color(0xff757575),
    Color super.galleryIconColor = const Color(0xff757575),
    Color recorderIconColor = const Color(0xff757575),
    Color super.stopIconColor = const Color(0xff757575),
    Color super.replyMessageColor = Colors.grey,
    Color super.appBarTitleTextStyle = Colors.white,
    Color super.messageReactionBackGroundColor = const Color(0xff383152),
    Color super.messageReactionBorderColor = const Color(0xff272336),
    Color super.verticalBarColor = const Color(0xff383152),
    Color super.chatHeaderColor = Colors.white,
    Color super.themeIconColor = Colors.white,
    Color super.shareIconColor = Colors.white,
    Color super.messageTimeIconColor = Colors.white,
    Color super.messageTimeTextColor = Colors.white,
    Color super.waveformBackgroundColor = const Color(0xff383152),
    Color super.waveColor = Colors.white,
    Color super.replyMicIconColor = Colors.white,
  }) : super(
    recordIconColor: recorderIconColor,
  );
}

class LightTheme extends AppTheme {
  LightTheme({
    Color flashingCircleDarkColor = const Color(0xffEE5366),
    Color flashingCircleBrightColor = const Color(0xffFCD8DC),
    TextStyle incomingChatLinkTitleStyle = const TextStyle(color: Colors.black),
    TextStyle outgoingChatLinkTitleStyle = const TextStyle(color: Colors.black),
    TextStyle outgoingChatLinkBodyStyle = const TextStyle(color: Colors.grey),
    TextStyle incomingChatLinkBodyStyle = const TextStyle(color: Colors.grey),
    Color textFieldTextColor = Colors.black,
    Color repliedTitleTextColor = Colors.black,
    Color swipeToReplyIconColor = Colors.black,
    double elevation = 2,
    Color appBarColor = Colors.white,
    Color backArrowColor = const Color(0xffEE5366),
    Color backgroundColor = const Color(0xffeeeeee),
    Color replyDialogColor = const Color(0xffFCD8DC),
    Color linkPreviewOutgoingChatColor = const Color(0xffFCD8DC),
    Color linkPreviewIncomingChatColor = const Color(0xFFEEEEEE),
    TextStyle linkPreviewIncomingTitleStyle = const TextStyle(),
    TextStyle linkPreviewOutgoingTitleStyle = const TextStyle(),
    Color replyTitleColor = const Color(0xffEE5366),
    Color reactionPopupColor = Colors.white,
    Color replyPopupColor = Colors.white,
    Color replyPopupButtonColor = Colors.black,
    Color replyPopupTopBorderColor = const Color(0xFFBDBDBD),
    Color reactionPopupTitleColor = Colors.grey,
    Color textFieldBackgroundColor = Colors.white,
    Color outgoingChatBubbleColor = const Color(0xffEE5366),
    Color inComingChatBubbleColor = Colors.white,
    Color inComingChatBubbleTextColor = Colors.black,
    Color repliedMessageColor = const Color(0xffff8aad),
    Color closeIconColor = Colors.black,
    Color shareIconBackgroundColor = const Color(0xFFE0E0E0),
    Color sendButtonColor = const Color(0xffEE5366),
    Color cameraIconColor = Colors.black,
    Color galleryIconColor = Colors.black,
    Color replyMessageColor = Colors.black,
    Color appBarTitleTextStyle = Colors.black,
    Color messageReactionBackGroundColor = const Color(0xFFEEEEEE),
    Color messageReactionBorderColor = Colors.white,
    Color verticalBarColor = const Color(0xffEE5366),
    Color chatHeaderColor = Colors.black,
    Color themeIconColor = Colors.black,
    Color shareIconColor = Colors.black,
    Color messageTimeIconColor = Colors.black,
    Color messageTimeTextColor = Colors.black,
    Color recorderIconColor = Colors.black,
    Color stopIconColor = Colors.black,
    Color waveformBackgroundColor = Colors.white,
    Color waveColor = Colors.black,
    Color replyMicIconColor = Colors.black,
  }) : super(
    reactionPopupColor: reactionPopupColor,
    closeIconColor: closeIconColor,
    verticalBarColor: verticalBarColor,
    textFieldBackgroundColor: textFieldBackgroundColor,
    replyTitleColor: replyTitleColor,
    replyDialogColor: replyDialogColor,
    backgroundColor: backgroundColor,
    appBarColor: appBarColor,
    appBarTitleTextStyle: appBarTitleTextStyle,
    backArrowColor: backArrowColor,
    chatHeaderColor: chatHeaderColor,
    inComingChatBubbleColor: inComingChatBubbleColor,
    inComingChatBubbleTextColor: inComingChatBubbleTextColor,
    messageReactionBackGroundColor: messageReactionBackGroundColor,
    messageReactionBorderColor: messageReactionBorderColor,
    outgoingChatBubbleColor: outgoingChatBubbleColor,
    repliedMessageColor: repliedMessageColor,
    replyMessageColor: replyMessageColor,
    sendButtonColor: sendButtonColor,
    shareIconBackgroundColor: shareIconBackgroundColor,
    themeIconColor: themeIconColor,
    shareIconColor: shareIconColor,
    elevation: elevation,
    messageTimeIconColor: messageTimeIconColor,
    messageTimeTextColor: messageTimeTextColor,
    textFieldTextColor: textFieldTextColor,
    repliedTitleTextColor: repliedTitleTextColor,
    swipeToReplyIconColor: swipeToReplyIconColor,
    replyPopupColor: replyPopupColor,
    replyPopupButtonColor: replyPopupButtonColor,
    replyPopupTopBorderColor: replyPopupTopBorderColor,
    reactionPopupTitleColor: reactionPopupTitleColor,
    linkPreviewOutgoingChatColor: linkPreviewOutgoingChatColor,
    linkPreviewIncomingChatColor: linkPreviewIncomingChatColor,
    linkPreviewIncomingTitleStyle: linkPreviewIncomingTitleStyle,
    linkPreviewOutgoingTitleStyle: linkPreviewOutgoingTitleStyle,
    incomingChatLinkBodyStyle: incomingChatLinkBodyStyle,
    incomingChatLinkTitleStyle: incomingChatLinkTitleStyle,
    outgoingChatLinkBodyStyle: outgoingChatLinkBodyStyle,
    outgoingChatLinkTitleStyle: outgoingChatLinkTitleStyle,
    flashingCircleDarkColor: flashingCircleDarkColor,
    flashingCircleBrightColor: flashingCircleBrightColor,
    galleryIconColor: galleryIconColor,
    cameraIconColor: cameraIconColor,
    stopIconColor: stopIconColor,
    recordIconColor: recorderIconColor,
    waveformBackgroundColor: waveformBackgroundColor,
    waveColor: waveColor,
    replyMicIconColor: replyMicIconColor,
  );
}