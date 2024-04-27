import 'package:chatview/chatview.dart';
import 'package:flutter/material.dart';
import '../data.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {


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
        name: 'Simform',
        profilePhoto: Data.profileImage,
      ),
      ChatUser(
        id: '3',
        name: 'Jhon',
        profilePhoto: Data.profileImage,
      ),
      ChatUser(
        id: '4',
        name: 'Mike',
        profilePhoto: Data.profileImage,
      ),
      ChatUser(
        id: '5',
        name: 'Rich',
        profilePhoto: Data.profileImage,
      ),
    ],
  );

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
          loadingWidgetConfig: const ChatViewStateWidgetConfiguration(
            loadingIndicatorColor: Color(0xffEE5366),
          ),
          onReloadButtonTap: () {},
        ),
        typeIndicatorConfig: const TypeIndicatorConfiguration(
          flashingCircleBrightColor: Color(0xffFCD8DC),
          flashingCircleDarkColor: Color(0xffEE5366),
        ),
        appBar: ChatViewAppBar(
          elevation: 2,
          backGroundColor: Colors.white,
          profilePicture: Data.profileImage,
          backArrowColor: const Color(0xffEE5366),
          chatTitle: "ChatBot",
          chatTitleTextStyle: const TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
            fontSize: 18,
            letterSpacing: 0.25,
          ),
          userStatus: "online",
          userStatusTextStyle: const TextStyle(color: Colors.grey),
          actions: [
            IconButton(
              tooltip: 'Toggle TypingIndicator',
              onPressed: _showHideTypingIndicator,
              icon: const Icon(
                Icons.keyboard,
                color: Colors.black,
              ),
            ),
          ],
        ),
        chatBackgroundConfig: const ChatBackgroundConfiguration(
          messageTimeIconColor: Colors.white,
          messageTimeTextStyle: TextStyle(color: Colors.white),
          defaultGroupSeparatorConfig: DefaultGroupSeparatorConfiguration(
            textStyle: TextStyle(
              color: Colors.white,
              fontSize: 17,
            ),
          ),
          backgroundColor:Colors.white,
        ),
        sendMessageConfig: SendMessageConfiguration(
          imagePickerIconsConfig: ImagePickerIconsConfiguration(
            cameraIconColor: Colors.black,
            galleryIconColor: Colors.black,
          ),
          replyMessageColor: Colors.white,
          defaultSendButtonColor: Colors.black,
          replyDialogColor: Colors.white,
          replyTitleColor: Colors.white,
          textFieldBackgroundColor: Colors.white,
          closeIconColor: Colors.black,
          textFieldConfig: TextFieldConfiguration(
            onMessageTyping: (status) {
              /// Do with status
              debugPrint(status.toString());
            },
            compositionThresholdTime: const Duration(seconds: 1),
            textStyle: TextStyle(color: Colors.black),
          ),
          micIconColor: Colors.white,
          voiceRecordingConfiguration: const VoiceRecordingConfiguration(
            backgroundColor: Colors.black,
            recorderIconColor: Colors.black,
            waveStyle: WaveStyle(
              showMiddleLine: false,
              waveColor: Colors.black ?? Colors.white,
              extendWaveform: true,
            ),
          ),
        ),
        chatBubbleConfig: ChatBubbleConfiguration(
          outgoingChatBubbleConfig: const ChatBubble(
            linkPreviewConfig: LinkPreviewConfiguration(
              backgroundColor: Colors.white,
              bodyStyle: TextStyle(color: Colors.grey),
              titleStyle: TextStyle(color: Colors.black),
            ),
            receiptsWidgetConfig:
            ReceiptsWidgetConfig(showReceiptsIn: ShowReceiptsIn.all),
            color: Color(0xffEE5366),
          ),
          inComingChatBubbleConfig: ChatBubble(
            linkPreviewConfig: const LinkPreviewConfiguration(
              linkStyle: TextStyle(
                color: Colors.white,
                decoration: TextDecoration.underline,
              ),
              backgroundColor: Colors.white,
              bodyStyle: TextStyle(color: Colors.grey),
              titleStyle: TextStyle(color: Colors.black),
            ),
            textStyle: TextStyle(color: Colors.black),
            onMessageRead: (message) {
              /// send your message reciepts to the other client
              debugPrint('Message Read');
            },
            senderNameTextStyle:
            TextStyle(color: Colors.black),
            color: Colors.black,
          ),
        ),
        replyPopupConfig: ReplyPopupConfiguration(
          backgroundColor: Colors.white,
          buttonTextStyle: TextStyle(color: Colors.black),
          topBorderColor: Colors.black,
        ),
        reactionPopupConfig: ReactionPopupConfiguration(
          shadow: BoxShadow(
            color: Colors.grey.shade400,
            blurRadius: 20,
          ),
          backgroundColor: Colors.black,
        ),
        messageConfig: MessageConfiguration(
          messageReactionConfig: MessageReactionConfiguration(
            backgroundColor: Colors.black,
            borderColor: Colors.white,
            reactedUserCountTextStyle:
            TextStyle(color: Colors.white),
            reactionCountTextStyle:
            TextStyle(color: Colors.black),
            reactionsBottomSheetConfig: ReactionsBottomSheetConfiguration(
              backgroundColor: const Color(0xff272336),
              reactedUserTextStyle: TextStyle(
                color: Colors.black,
              ),
              reactionWidgetDecoration: BoxDecoration(
                color: Colors.black,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.shade200,
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
              defaultIconBackgroundColor: const Color(0xff383152),
              defaultIconColor: const Color(0xff383152),
            ),
          ),
        ),
        profileCircleConfig: const ProfileCircleConfiguration(
          profileImageUrl: Data.profileImage,
        ),
        repliedMessageConfig: RepliedMessageConfiguration(
          backgroundColor: Colors.black,
          verticalBarColor: Colors.white,
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
          replyTitleTextStyle: TextStyle(color: Colors.black),
        ),
        swipeToReplyConfig: SwipeToReplyConfiguration(
          replyIconColor: Colors.black,
        ),
      ),
    );
  }

  void _onSendTap(
      String message,
      ReplyMessage replyMessage,
      MessageType messageType,
      ) {
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
  }

  void _onThemeIconTap() {
    setState(() {

      }
    );
  }
}