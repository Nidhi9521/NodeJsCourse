class MessagesModel {
  static final List<String> messages = [];

  static updateMessages(String message) async {
    messages.add(message);
  }
}