<?php
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST');

$data = json_decode(file_get_contents('php://input'), true);

// Отправляем
if (isset($data['name'], $data['phone'], $data['list'])) {
  $message = '' . $data['name'] . ' оставил заявку, его телефон ' . $data['phone'];
  $message .= '\nСписок болезней:\n';
  foreach ($data['list'] as $item) {
    $message .= $item . '\n';
  }
  if (mail('nobody@ramada.kz', 'From: ramada@ramada.kz', $message, 'From: ramada@ramada.kz')) {
    http_response_code(200);
    
    echo json_encode(['message' => 'Сообщение успешно отправлено', 'body' => $message, 'code' => 200]);
  } else {
    http_response_code(503);
    
    echo json_encode(['message' => 'Ошибка отправки', 'code' => 503]);
  }
} else {
  http_response_code(400);

  echo json_encode(['message' => 'Incomplete data', 'code' => 400]);
}