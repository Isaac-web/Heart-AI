import 'package:animate_do/animate_do.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:gsform/gs_form/model/data_model/date_data_model.dart';
import 'package:gsform/gs_form/model/data_model/radio_data_model.dart';
import 'package:gsform/gs_form/model/data_model/spinner_data_model.dart';
import 'package:gsform/gs_form/widget/field.dart';
import 'package:gsform/gs_form/widget/form.dart';
import 'package:gsform/gs_form/widget/section.dart';
import 'package:heart_u/core/app_export.dart';
import '../../theme/custom_button_style.dart';
import '../../widgets/custom_elevated_button.dart';

class DoctorForm extends StatefulWidget {
  DoctorForm({Key? key}) : super(key: key);

  @override
  State<DoctorForm> createState() => _DoctorFormState();
}

class _DoctorFormState extends State<DoctorForm> {
  late GSForm form;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Fill patient's details"),
      ),
      body: Padding(
        padding: const EdgeInsets.only(left: 12.0, right: 12, top: 24),
        child: Column(
          children: [
            BounceInDown(
              duration: const Duration(milliseconds: 1000),
              child: Expanded(
                child: SingleChildScrollView(
                  child: form = GSForm.multiSection(context, sections: [
                    GSSection(sectionTitle: 'Patient Symptoms', fields: [
                      GSField.text(
                        value: '',
                        tag: 'name',
                        title: 'Name',
                        minLine: 1,
                        maxLine: 1,
                      ),
                      GSField.radioGroup(
                        hint: 'Radio Group',
                        tag: 'radio',
                        showScrollBar: true,
                        scrollBarColor: Colors.red,
                        scrollDirection: Axis.horizontal,
                        height: 50,
                        scrollable: true,
                        required: true,
                        weight: 12,
                        title: 'Gender',
                        searchable: false,
                        searchHint: 'Search...',
                        searchIcon: const Icon(Icons.search),
                        searchBoxDecoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.blue,
                            width: 1,
                          ),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        items: [
                          RadioDataModel(title: 'Male', isSelected: false),
                          RadioDataModel(title: 'Female', isSelected: false),
                        ],
                        callBack: (data) {},
                      ),
                      GSField.datePicker(
                        calendarType: GSCalendarType.gregorian,
                        tag: 'visitDate',
                        title: 'DatePicker',
                        weight: 12,
                        required: false,
                        initialDate: GSDate(day: 29, month: 4, year: 2024),
                        errorMessage: 'please select a date',
                      ),
                      GSField.text(
                        value: '',
                        tag: 'lastName',
                        title: 'Last name',
                        minLine: 1,
                        maxLine: 1,
                        weight: 12,
                        required: true,
                      ),
                      GSField.spinner(
                        tag: 'customer_type',
                        required: false,
                        weight: 6,
                        title: 'Gender',
                        value: SpinnerDataModel(
                          name: 'woman',
                          id: 2,
                        ),
                        onChange: (model) {},
                        items: [
                          SpinnerDataModel(
                            name: 'man',
                            id: 1,
                          ),
                          SpinnerDataModel(
                            name: 'woman',
                            id: 2,
                          ),
                          SpinnerDataModel(
                            name: 'woman',
                            id: 2,
                          ),
                        ],
                      ),
                      GSField.mobile(
                        tag: 'mobile',
                        title: 'Phone number',
                        maxLength: 10,
                        helpMessage: '0550000000',
                        weight: 6,
                        required: false,
                        errorMessage: 'some error',
                      ),
                    ]),
                  ]),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Expanded(
                    flex: 1,
                    child: BounceInUp(
                      duration: const Duration(milliseconds: 1000),
                      child: CustomElevatedButton(
                        onPressed: () {
                          AwesomeDialog(
                            context: context,
                            animType: AnimType.leftSlide,
                            headerAnimationLoop: true,
                            dialogType: DialogType.success,
                            showCloseIcon: true,
                            title: 'Confirm',
                            desc:
                            'Send details',
                            btnOkOnPress: () {
                              debugPrint('OnClcik');
                            },
                            btnOkIcon: Icons.check_circle,
                            onDismissCallback: (type) {
                              debugPrint('Dialog Dissmiss from callback $type');
                            },
                          ).show();
                        },
                        height: 43.v,
                        text: "Submit",
                        buttonStyle: CustomButtonStyles.fillPrimaryTL10,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}