import 'package:flutter/material.dart';
import '../../core/app_export.dart';
import 'custom_image_view.dart';

// ignore_for_file: must_be_immutable
class AppbarTitleImage extends StatelessWidget {
  AppbarTitleImage({Key? key, this.imagePath, this.margin, this.onTap})
      : super(
    key: key,
  );

  String? imagePath;

  EdgeInsetsGeometry? margin;

  Function? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        onTap?.call();
      },
      child: Padding(
        padding: margin ?? EdgeInsets.zero,
        child: CustomImageView(
          imagePath: imagePath!,
          height: 32.v,
          width: 133.h,
          fit: BoxFit.contain,
        ),
      ),
    );
  }
}
