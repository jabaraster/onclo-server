# コマンド一覧

## デプロイ

```sh
sls deploy -v
```

Macで、デプロイ完了後に通知を表示する.

```sh
sls deploy -v && osascript -e 'display notification "deploy finished." with title "Serverless"'
```

Macで、デプロイ完了後に音を鳴らす.

```sh
sls deploy -v && afplay /System/Library/Sounds/Glass.aiff
```

## DynamoDB Local

ロッカー開閉状況テーブルの作成.

```sh
aws dynamodb create-table \
  --endpoint-url \
    http://localhost:8000 \
  --table-name dev-locker \
  --attribute-definitions \
    AttributeName=partition,AttributeType=S \
    AttributeName=created,AttributeType=N \
  --key-schema \
    AttributeName=partition,KeyType=HASH \
    AttributeName=created,KeyType=RANGE \
  --provisioned-throughput \
      ReadCapacityUnits=1,WriteCapacityUnits=1
```
