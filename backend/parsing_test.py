import unittest
import parser_factory
import os

class TestParserFactory(unittest.TestCase):
    def test_tarParser(self):
        parser = parser_factory.FileParser.factory("application/x-gzip")
        self.assertTrue(isinstance(parser, parser_factory.TarParser))
    
    def test_parse_tarFile(self):
        parser = parser_factory.FileParser.factory("application/x-gzip")
        tar_path = "./react-docker-kit-master/backend/test_content/content.tar.gz"
        extractedData = parser.extract(tar_path)
        
        list_size = len(extractedData)
        msg_id = extractedData[0].get('msg-id')
        date = extractedData[0].get('date')
        to = extractedData[0].get('to')
        sender = extractedData[0].get('sender')
        subject = extractedData[0].get('subject')

        success = (list_size == 12) and msg_id and date and to and sender and subject
        self.assertTrue(success)

    def test_msgParser(self):
        parser = parser_factory.FileParser.factory("application/octet-stream")
        self.assertTrue(isinstance(parser, parser_factory.MsgParser))
        

    def test_parse_msgFile(self):
        parser = parser_factory.FileParser.factory("application/octet-stream")
        msg_path = "./react-docker-kit-master/backend/test_content/content.msg"
        extractedData = parser.extract(msg_path)
        
        msg_id = extractedData[0].get('msg-id')
        date = extractedData[0].get('date')
        to = extractedData[0].get('to')
        sender = extractedData[0].get('sender')
        subject = extractedData[0].get('subject')

        success = msg_id and date and to and sender and subject
        self.assertTrue(success)

    
if __name__ == '__main__':
    unittest.main()