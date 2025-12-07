
```
curl -vk \
    --resolve example.com:4430:127.0.0.1 \
    --cacert ca.pem \
    --cert client.pem --key client.key \
    https://example.com:4430/
```