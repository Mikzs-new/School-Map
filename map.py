import networkx as nx
import matplotlib.pyplot as plt

class Node:
    def __init__(self, name, identity, building, description = '', number = '', _type = ''):
        self.building = building
        self.number = number
        self.name = name
        self.identity = identity
        self.desc = description
        self.type = _type 
        self.connection = []

    def __str__(self):
        if self.identity.casefold() == 'stairs':
            return self.building + ' ' + self.name + ' ' + self.identity + ' ' + self.number
        elif self.identity.casefold() == 'elevator' or self.identity.casefold() == 'fire exit':
            return self.building + ' ' + self.name + ' ' + self.identity
        elif self.name != '' and self.identity == '' and self.number == '':
            return self.building + ' ' + self.name
        elif self.identity.casefold() == 'office' and self.number == '':
            return self.building + ' ' + self.name
        elif self.identity.casefold() == 'room' and len(self.number) == 3 and self.name == '':
            return self.building + ' ' + self.number + ' Room'
        elif self.identity.casefold() == 'room' and len(self.number) == 3:
            return self.building + ' ' + self.number + ' - ' + self.name
        else:
            return self.building + ' ' + self.number + ' - ' + self.name
         
    def __hash__(self):
        return hash(self.name) 

    def __repr__(self):
        return f"{self.type}: {self.name}"

# NEW FIELD, ROAD, & LOBBY
lobby_passage = [
    Node(building='Lobby', number='', name='Canteen', identity='Passage'),
    Node(building='Lobby', number='', name='Pavement', identity='Passage'),
    Node(building='Lobby', number='', name='AGM', identity='Passage'),
]
lobby = [
    Node(building='Lobby', number='', name='Tables & Chairs', identity='Lounge'),
    Node(building='Lobby', number='', name='Faculty Room', identity='Office'),
]
field = [
    Node(building='Center', number='', name='Pavement', identity='Path'),
]
road = [
    Node(building='road', number='', name='Vehicle Road', identity='Path'),
]
place = [lobby_passage, lobby, field, road]

# NEW EMM
emm_floor_1 = [
    Node(building='EMM', number='1', name='1st Floor', identity='Stairs'),
    Node(building='EMM', number='2', name='1st Floor', identity='Stairs'),

    Node(building='EMM', number='101', name='Computer Lab A', identity='Laboratory'),
    Node(building='EMM', number='102', name='Computer Lab B', identity='Laboratory'),
    Node(building='EMM', number='105', name='Computer Lab C', identity='Laboratory'),
    Node(building='EMM', number='103', name='MIS', identity='Office'),
    Node(building='EMM', number='104', name='Department', identity='Office'),
    Node(building='EMM', number='108', name='Infirmary', identity='Clinic'),
    Node(building='EMM', number='', name='Storage Room', identity='Storage'),
    Node(building='EMM', number='1st Floor', name='CR Women', identity='Comfort Room'),
]

emm_floor_2 = [
    Node(building='EMM', number='1', name='2nd Floor', identity='Stairs'),
    Node(building='EMM', number='2', name='2nd Floor', identity='Stairs'),

    Node(building='EMM', number='201', name='', identity='Room'),
    Node(building='EMM', number='202', name='BSCrim Office', identity='Office'),
    Node(building='EMM', number='', name='IT Clinic', identity='Office'),
    Node(building='EMM', number='203', name='Marketing and Office Promotion', identity='office'),
    Node(building='EMM', number='204', name='Student Service Offices & Supreme Student Council', identity='Office'),
    Node(building='EMM', number='205', name='Admission Office', identity='Office'),
    Node(building='EMM', number='206', name='TVET Office', identity='Office'),
    Node(building='EMM', number='207', name='Alumni Office', identity='Office'),
    Node(building='EMM', number='208', name='BECED Simulation Room', identity='Room'),
    Node(building='EMM', number='2nd Floor', name='CR Men & Women', identity='Comfort Room'),
]

emm_floor_3 = [
    Node(building='EMM', number='1', name='3rd Floor', identity='Stairs'),
    Node(building='EMM', number='2', name='3rd Floor', identity='Stairs'),

    Node(building='EMM', number='301', name='', identity='Room'),
    Node(building='EMM', number='302', name='', identity='Room'),
    Node(building='EMM', number='303', name='', identity='Room'),
    Node(building='EMM', number='304', name='', identity='Room'),
    Node(building='EMM', number='305', name='TEP Coordinators Office', identity='Office'),
    Node(building='EMM', number='306', name='Secondary Education Simulation Room', identity='Room'),
    Node(building='EMM', number='307', name='Elementary Education Simulation Room', identity='Room'),
    Node(building='EMM', number='308', name='Teacher Education Program', identity='Office'),
    Node(building='EMM', number='3rd Floor', name='CR Men & Women', identity='Comfort Room'),
]

emm_floor_4 = [
    Node(building='EMM', number='1', name='4th Floor', identity='Stairs'),
    Node(building='EMM', number='2', name='4th Floor', identity='Stairs'),

    Node(building='EMM', number='401', name='CAS Laboratory', identity='Laboratory'),
    Node(building='EMM', number='402', name='Physics Laboratory', identity='Laboratory'),
    Node(building='EMM', number='403', name='Science Lab Control Office', identity='Office'),
    Node(building='EMM', number='', name='', identity='Vacant'),
    Node(building='EMM', number='404', name='Chemistry Laboratory', identity='Laboratory'),
    Node(building='EMM', number='405', name='', identity='Room'),
    Node(building='EMM', number='406', name='International Linkages Office', identity='Office'),
]

emm_passage = [
    Node(building='EMM', number='', name='Lobby', identity='Passage'),
    Node(building='EMM', number='', name='Pavement', identity='Passage'),
    Node(building='EMM', number='', name='ERM', identity='Passage'),
]
emm = [emm_passage, emm_floor_1, emm_floor_2, emm_floor_3, emm_floor_4]

# NEW ERM
erm_floor_1 = [
    Node(building='ERM', number='', name='1st', identity='Stairs'),

    Node(building='ERM', number='101', name='Graduate School Program', identity='Room'),
    Node(building='ERM', number='102', name='Graduate School Library', identity='Library'),
]

erm_floor_2 = [
    Node(building='ERM', number='', name='2nd', identity='Stairs'),

    Node(building='ERM', number='201', name='Foreign Books Library', identity='Library'),
]

erm_floor_3 = [
    Node(building='ERM', number='', name='3rd', identity='Stairs'),

    Node(building='ERM', number='301', name='Filipino Author Library', identity='Library'),
]

erm_floor_4 = [
    Node(building='ERM', number='', name='4th', identity='Stairs'),

    Node(building='ERM', number='401', name='Theatre', identity='Theatre'),
]
erm_passage = [
    Node(building='ERM', number='', name='FGM', identity='Passage'),
    Node(building='ERM', number='', name='Pavement', identity='Passage'),
    Node(building='ERM', number='', name='EMM', identity='Passage'),
]

erm = [erm_passage, erm_floor_1, erm_floor_2, erm_floor_3, erm_floor_4]

# NEW AGM
agm_floor_1 = [
    Node(building='AGM', number='1', name='1st Floor', identity='Stairs'),
    Node(building='AGM', number='2', name='1st Floor', identity='Stairs'),

    Node(building='AGM', number='101', name='Hydraulics Laboratory', identity='Laboratory'),
    Node(building='AGM', number='102', name='Materials & Testing Laboratory', identity='Laboratory'),
    Node(building='AGM', number='103', name='CBE Office', identity='Office'),
    Node(building='AGM', number='104', name='CAS Office', identity='Office'),
    Node(building='AGM', number='105', name='Guidance Office', identity='Office'),
    Node(building='AGM', number='106', name='Counseling Office', identity='Office'),
    Node(building='AGM', number='107', name='', identity='Room'),
    Node(building='AGM', number='110', name='Bookstore & Printing Office', identity='Bookstore'),
    Node(building='AGM', number='', name='', identity='Canteen'),
    Node(building='AGM', number='', name='School Exit', identity='Exit'),

    Node(building='AGM', number='', name='', identity='Laboratory'),
    Node(building='AGM', number='', name='', identity='Office'),
    Node(building='AGM', number='', name='', identity='Room'),
]

agm_floor_2 = [
    Node(building='AGM', number='1', name='2nd Floor', identity='Stairs'),
    Node(building='AGM', number='2', name='2nd Floor', identity='Stairs'),

    Node(building='AGM', number='200', name='Electrical Room', identity='Room'),
    Node(building='AGM', number='201', name='Customs Admin Simulation Room', identity='Room'),
    Node(building='AGM', number='202', name='', identity='Room'),
    Node(building='AGM', number='203', name='Criminology Internship Unit', identity='Office'),
    Node(building='AGM', number='204', name='General Education Program', identity='Office'),
    Node(building='AGM', number='205', name='Engineering Faculty', identity='Office'),
    Node(building='AGM', number='206', name='', identity='Room'),
    Node(building='AGM', number='', name='Observation', identity='Room'),
    Node(building='AGM', number='207', name='Psyche Lab', identity='Laboratory'),
    Node(building='AGM', number='208', name='', identity='Room'),
    Node(building='AGM', number='209', name='Engineering Program', identity='Office'),
    Node(building='AGM', number='210', name='', identity='Room'),
    Node(building='AGM', number='211', name='', identity='Room'),
    Node(building='AGM', number='212', name='AB English Simulation Room', identity='Room'),
    Node(building='AGM', number='213', name='Communication Hub', identity='Others'),
    Node(building='AGM', number='214', name='Mass Communication Room', identity='Room'),
    Node(building='AGM', number='216', name='ETEEAP Office', identity='Office'),

    Node(building='AGM', number='', name='', identity='Laboratory'),
    Node(building='AGM', number='', name='', identity='Office'),
    Node(building='AGM', number='', name='', identity='Room'),
]

agm_passage = [
    Node(building='AGM', number='', name='Lobby', identity='Passage'),
    Node(building='AGM', number='', name='Road', identity='Passage'),
    Node(building='AGM', number='', name='School Entrance', identity='Passage'),
    Node(building='AGM', number='', name='FGM', identity='Passage'),
]

agm = [agm_passage, agm_floor_1, agm_floor_2]

# NEW FGM

fgm_floor_1 = [
    Node(building='FGM', number='1', name='1st Floor', identity='Stairs'),
    Node(building='FGM', number='2', name='1st Floor', identity='Stairs'),
    Node(building='FGM', number='', name='1st Floor', identity='Elevator'),

    Node(building='FGM', number='101', name='Male CR', identity='Comfort Room'),
    Node(building='FGM', number='102', name='Faculty & Staff CR', identity='Comfort Room'),
    Node(building='FGM', number='103', name='PWD CR', identity='Comfort Room'),

    Node(building='FGM', number='104', name='Registrar\'s Office', identity='Office'),
    Node(building='FGM', number='105', name='Finance Office', identity='Office'),
    Node(building='FGM', number='106', name='Academic Affairs Office', identity='Office'),
    Node(building='FGM', number='107', name='Electrical Room', identity='Room'),
    Node(building='FGM', number='108', name='Conference Room', identity='Room'),
    Node(building='FGM', number='109', name='REEDO', identity='Office'),
    Node(building='FGM', number='', name='', identity='Cashier'),
]

fgm_floor_2 = [
    Node(building='FGM', number='1', name='2nd Floor', identity='Stairs'),
    Node(building='FGM', number='2', name='2nd Floor', identity='Stairs'),
    Node(building='FGM', number='', name='2nd Floor', identity='Elevator'),
    Node(building='FGM', number='', name='2nd Floor', identity='Fire Exit'),

    Node(building='FGM', number='201', name='CR Men', identity='Comfort Room'),
    Node(building='FGM', number='212', name='CR Women', identity='Comfort Room'),

    Node(building='FGM', number='202', name='Nursing Skills Lab 1', identity='Laboratory'),
    Node(building='FGM', number='203', name='Nursing Skills Lab 2', identity='Laboratory'),
    Node(building='FGM', number='204', name='COAHS Dean\'s Office', identity='Office'),
    Node(building='FGM', number='205', name='Nursing Skills Lab 3', identity='Laboratory'),
    Node(building='FGM', number='206', name='Anatomy Lab', identity='Laboratory'),
    Node(building='FGM', number='207', name='(BSHM-BSTM-BSOA-REM) Simulation Room', identity='Room'),
    Node(building='FGM', number='208', name='BSOA-BSHM-BSTM-BSREM Office', identity='Office'),
    Node(building='FGM', number='209', name='Electrical Room', identity='Room'),
    Node(building='FGM', number='210', name='Instrumentation Room & Pharma Lab Extension', identity='Laboratory'),
    Node(building='FGM', number='211', name='Nursing Skills Lab 4', identity='Laboratory'),
]

fgm_floor_3 = [
    Node(building='FGM', number='1', name='3rd Floor', identity='Stairs'),
    Node(building='FGM', number='2', name='3rd Floor', identity='Stairs'),
    Node(building='FGM', number='', name='3rd Floor', identity='Elevator'),
    Node(building='FGM', number='', name='3rd Floor', identity='Fire Exit'),

    Node(building='FGM', number='301', name='CR Men', identity='Comfort Room'),
    Node(building='FGM', number='313', name='CR Women', identity='Comfort Room'),

    Node(building='FGM', number='302', name='', identity='Room'),
    Node(building='FGM', number='303', name='', identity='Room'),
    Node(building='FGM', number='', name='Stock Room', identity='Storage'),
    Node(building='FGM', number='306', name='', identity='Room'),
    Node(building='FGM', number='307', name='', identity='Room'),
    Node(building='FGM', number='308', name='', identity='Room'),
    Node(building='FGM', number='3rd Floor', name='Electrical Room', identity='Room'),
    Node(building='FGM', number='3rd Floor', name='Counseling Room', identity='Room'),
    Node(building='FGM', number='309', name='', identity='Room'),
    Node(building='FGM', number='311', name='', identity='Room'),
    Node(building='FGM', number='312', name='', identity='Room'),
]

fgm_floor_4 = [
    Node(building='FGM', number='1', name='4th Floor', identity='Stairs'),
    Node(building='FGM', number='2', name='4th Floor', identity='Stairs'),
    Node(building='FGM', number='', name='4th Floor', identity='Elevator'),
    Node(building='FGM', number='', name='4th Floor', identity='Fire Exit'),

    Node(building='FGM', number='401', name='CR Men', identity='Comfort Room'),
    Node(building='FGM', number='411', name='CR Women', identity='Comfort Room'),

    Node(building='FGM', number='402', name='', identity='Room'),
    Node(building='FGM', number='403', name='', identity='Room'),
    Node(building='FGM', number='405', name='', identity='Room'),
    Node(building='FGM', number='406', name='', identity='Room'),
    Node(building='FGM', number='407', name='Stock Room', identity='Storage'),
    Node(building='FGM', number='', name='', identity='Tambayanan'),
    Node(building='FGM', number='408', name='Electrical Room', identity='Room'),
    Node(building='FGM', number='409', name='', identity='Room'),
    Node(building='FGM', number='410', name='', identity='Room'),
]

fgm_floor_5 = [
    Node(building='FGM', number='1', name='5th Floor', identity='Stairs'),
    Node(building='FGM', number='2', name='5th Floor', identity='Stairs'),
    Node(building='FGM', number='', name='5th Floor', identity='Elevator'),
    Node(building='FGM', number='', name='5th Floor', identity='Fire Exit'),

    Node(building='FGM', number='501', name='CR Men', identity='Comfort Room'),
    Node(building='FGM', number='514', name='CR Women', identity='Comfort Room'),

    Node(building='FGM', number='502', name='Criminology Lab', identity='Laboratory'),
    Node(building='FGM', number='503', name='', identity='Room'),
    Node(building='FGM', number='505', name='Interrogation', identity='Room'),
    Node(building='FGM', number='506', name='Dark Room Forensic Photography', identity='Room'),
    Node(building='FGM', number='507', name='Crime Scene Room', identity='Room'),
    Node(building='FGM', number='508', name='Faculty Lounge', identity='Lounge'),
    Node(building='FGM', number='509', name='Court Room', identity='Room'),
    Node(building='FGM', number='510', name='', identity='Room'),
    Node(building='FGM', number='511', name='Electrical Room', identity='Room'),
    Node(building='FGM', number='512', name='', identity='Room'),
    Node(building='FGM', number='513', name='', identity='Room'),
]

fgm_floor_6 = [
    Node(building='FGM', number='1', name='6th Floor', identity='Stairs'),
    Node(building='FGM', number='2', name='6th Floor', identity='Stairs'),
    Node(building='FGM', number='', name='6th Floor', identity='Elevator'),
    Node(building='FGM', number='', name='6th Floor', identity='Fire Exit'),

    Node(building='FGM', number='601', name='CR Men', identity='Comfort Room'),
    Node(building='FGM', number='612', name='CR Women', identity='Comfort Room'),

    Node(building='FGM', number='602', name='', identity='Room'),
    Node(building='FGM', number='603', name='', identity='Room'),
    Node(building='FGM', number='604', name='', identity='Room'),
    Node(building='FGM', number='605', name='', identity='Room'),
    Node(building='FGM', number='607', name='', identity='Room'),
    Node(building='FGM', number='608', name='', identity='Room'),
    Node(building='FGM', number='609', name='Electrical Room', identity='Room'),
    Node(building='FGM', number='610', name='', identity='Room'),
    Node(building='FGM', number='611', name='', identity='Room'),
]

fgm_passage = [
    Node(building='AGM', number='', name='ERM', identity='Passage'),
    Node(building='AGM', number='', name='Pavement', identity='Passage'),
    Node(building='AGM', number='', name='AGM', identity='Passage'),
]

fgm = [fgm_passage, fgm_floor_1, fgm_floor_2, fgm_floor_3, fgm_floor_4, fgm_floor_5, fgm_floor_6]

rmmc = [place, emm, erm, agm, fgm]

for plc in rmmc:
    for pl in plc:
        for p in pl:
            print(p)

# G = nx.Graph()
# for place in rmmc:
#     for room in place:
#         for i in room:
#                 G.add_node(i, data=i)

# # for node in G.nodes:
# #     print(node)

# G.add_edge('FIELD Pavement', 'ROAD Vehicle Road')
# G.add_edge('FIELD Pavement', 'EMM Pavement Entrance')
# G.add_edge('FIELD Pavement', 'LOBBY Pavement Entrance')
# G.add_edge('FIELD Pavement', 'FGM Pavement Entrance')
# G.add_edge('FIELD Pavement', 'LOBBY Faculty Room')
# G.add_edge('FIELD Pavement', 'LOBBY Tables & Chairs')
# G.add_edge('FIELD Pavement', 'LIBRARY Pavement Entrance')
# G.add_edge('ROAD Vehicle Road', 'AGM Road Entrance')
# G.add_edge('ROAD Vehicle Road', 'FIELD Pavement')

# G.add_edge('EMM Lobby Entrance', 'LOBBY Faculty Room')
# G.add_edge('EMM Library Entrance', 'LIBRARY EMM Entrance')
# G.add_edge('EMM Library Entrance', 'EMM Computer Lab C')
# G.add_edge('EMM Lobby Entrance', 'EMM Computer Lab A')
# G.add_edge('EMM 1st Floor Stairs 1', 'EMM Computer Lab A')
# G.add_edge('EMM Computer Lab B', 'EMM Computer Lab A')
# G.add_edge('EMM Computer Lab B', 'EMM Pavement Entrance')
# G.add_edge('EMM Computer Lab B', 'EMM MIS')
# G.add_edge('EMM MIS', 'EMM ITE Department')
# G.add_edge('EMM ITE Department', 'EMM Computer Lab C')
# G.add_edge('EMM EMM-Library Entrance', 'EMM Computer Lab C')
# G.add_edge('EMM 1st Floor Stairs 2', 'EMM Computer Lab C')
# G.add_edge('EMM 1st Floor Stairs 2', 'EMM Clinic')
# G.add_edge('EMM 1st Floor Stairs 2', 'EMM Storage')
# G.add_edge('EMM Comfort Room - Women CR', 'EMM Clinic')
# G.add_edge('EMM 1st Floor Stairs 1', 'EMM 2nd Floor Stairs 1')
# G.add_edge('EMM 1st Floor Stairs 2', 'EMM 2nd Floor Stairs 2')
# G.add_edge('EMM 2nd Floor Stairs 1', 'EMM 201 Room')
# G.add_edge('EMM 202 BSCrim Office', 'EMM 201 Room')
# G.add_edge('EMM 202 BSCrim Office', 'EMM IT Clinic')
# G.add_edge('EMM Marketing and Office Promotion', 'EMM IT Clinic')
# G.add_edge('EMM Marketing and Office Promotion', 'EMM SSC/SSO')
# G.add_edge('EMM Admission Office', 'EMM SSC/SSO')
# G.add_edge('EMM Admission Office', 'EMM TVET Office')
# G.add_edge('EMM Alumni Office', 'EMM TVET Office')
# G.add_edge('EMM 2nd Floor Stairs 2', 'EMM Alumni Office')
# G.add_edge('EMM 2nd Floor Stairs 2', 'EMM BECED Room')
# G.add_edge('EMM 2nd Comfort Room - Men & Women CR', 'EMM BECED Room')
# G.add_edge('EMM 3rd Floor Stairs 1', 'EMM 2nd Floor Stairs 1')
# G.add_edge('EMM 3rd Floor Stairs 2', 'EMM 2nd Floor Stairs 2')
# G.add_edge('EMM 3rd Floor Stairs 1', 'EMM 301 Room')
# G.add_edge('EMM 302 Room', 'EMM 301 Room')
# G.add_edge('EMM 302 Room', 'EMM 303 Room')
# G.add_edge('EMM 304 Room', 'EMM 303 Room')
# G.add_edge('EMM 304 Room', 'EMM TEP Coordinators Office')
# G.add_edge('EMM Secondary Education Simulation Room', 'EMM TEP Coordinators Office')
# G.add_edge('EMM Secondary Education Simulation Room', 'EMM Elementary Education Simulation Room')
# G.add_edge('EMM 3rd Floor Stairs 2', 'EMM Elementary Education Simulation Room')
# G.add_edge('EMM 3rd Floor Stairs 2', 'EMM Teacher Education Program')
# G.add_edge('EMM 3rd Comfort Room - Men & Women CR', 'EMM Teacher Education Program')
# G.add_edge('EMM 3rd Floor Stairs 1', 'EMM 4th Floor Stairs 1')
# G.add_edge('EMM 3rd Floor Stairs 2', 'EMM 4th Floor Stairs 2')
# G.add_edge('EMM 4th Floor Stairs 1', 'EMM CAS Lab')
# G.add_edge('EMM Physics Lab', 'EMM CAS Lab')
# G.add_edge('EMM Physics Lab', 'EMM Vacant Room')
# G.add_edge('EMM Science Lab Control Office', 'EMM Vacant Room')
# G.add_edge('EMM Science Lab Control Office', 'EMM Chemistry Lab')
# G.add_edge('EMM 4th Floor Stairs 2', 'EMM Chemistry Lab')
# G.add_edge('EMM 4th Floor Stairs 2', 'EMM BLIS OFFICE')
# G.add_edge('EMM Theatre Room', 'EMM BLIS OFFICE')
# G.add_edge('EMM 4th Floor Stairs 2', 'EMM 405 Room')
# G.add_edge('EMM International Linkages Office', 'EMM 405 Room')

# G.add_edge('LIBRARY FGM Entrance', 'FGM Library Entrance')
# G.add_edge('LIBRARY EMM Entrance', 'Graduate School Library')
# G.add_edge('LIBRARY FGM Entrance', 'Graduate School Library')
# G.add_edge('Graduate School Library', 'LIBRARY Pavement Entrance')
# G.add_edge('Graduate School Library', 'LIBRARY 1st Floor Stairs')
# G.add_edge('LIBRARY 2nd Floor Stairs', 'LIBRARY 1st Floor Stairs')
# G.add_edge('LIBRARY 2nd Floor Stairs', 'Foreign Books Library')
# G.add_edge('LIBRARY 2nd Floor Stairs', 'LIBRARY 3rd Floor Stairs')
# G.add_edge('Filipino Author Library', 'LIBRARY 3rd Floor Stairs')
# G.add_edge('LIBRARY 4th Floor Stairs', 'LIBRARY 3rd Floor Stairs')
# G.add_edge('LIBRARY 4th Floor Stairs', 'LIBRARY Theatre')

# G.add_edge('LOBBY Faculty Room', 'LOBBY Tables & Chairs')
# G.add_edge('LOBBY Faculty Room', 'LOBBY AGM Entrance')
# G.add_edge('LOBBY Tables & Chairs', 'LOBBY AGM Entrance')
# G.add_edge('LOBBY Tables & Chairs', 'LOBBY Canteen Entrance')
# G.add_edge('AGM Canteen', 'LOBBY Canteen Entrance')
# G.add_edge('LOBBY AGM Entrance', 'AGM Lobby Entrance')

# G.add_edge('AGM 1st Floor Stairs 2', 'AGM Lobby Entrance')
# G.add_edge('AGM 1st Floor Stairs 2', 'AGM 2nd Floor Stairs 2')
# G.add_edge('AGM 2nd Floor Stairs 2', 'AGM Electrical Room')
# G.add_edge('AGM 200 Electrical Room', 'AGM Customs Admin Simulation Room')
# G.add_edge('AGM Customs Admin Simulation Room', 'AGM 202 Room')
# G.add_edge('AGM 203 Criminology Intern Unit', 'AGM 202 Room')
# G.add_edge('AGM General Education Program', 'AGM 203 Criminology Intern Unit')
# G.add_edge('AGM General Education Program', 'AGM Engineering Faculty')
# G.add_edge('AGM 206 Room', 'AGM Engineering Faculty')
# G.add_edge('AGM 206 Room', 'AGM Observation Room')
# G.add_edge('AGM Psyche Lab', 'AGM Observation Room')
# G.add_edge('AGM Psyche Lab', 'AGM 208 Room')
# G.add_edge('AGM Psyche Lab', 'AGM 210 Room')
# G.add_edge('AGM Engineering Program', 'AGM 210 Room')
# G.add_edge('AGM Engineering Program', 'AGM 211 Room')
# G.add_edge('AGM AB English Simulation', 'AGM 211 Room')
# G.add_edge('AGM AB English Simulation', 'AGM Communication Hub')
# G.add_edge('AGM Mass Communication Room', 'AGM Communication Hub')
# G.add_edge('AGM Lobby Entrance', 'AGM Canteen')
# G.add_edge('AGM Canteen', 'AGM 1st Floor Stairs 2')
# G.add_edge('AGM 1st Floor Stairs 1', 'AGM Bookstore')
# G.add_edge('AGM FGM Entrance', 'AGM Bookstore')
# G.add_edge('AGM Road Entrance', 'AGM 1st Floor Stairs 1')
# G.add_edge('AGM Hydraulics Laboratory', 'AGM 1st Floor Stairs 1')
# G.add_edge('AGM Hydraulics Laboratory', 'AGM Materials & Testing Laboratory')
# G.add_edge('AGM Materials & Testing Laboratory', 'AGM School Exit')
# G.add_edge('AGM School Entrance', 'AGM School Exit')
# G.add_edge('AGM School Entrance', 'AGM Materials & Testing Laboratory')
# G.add_edge('AGM School Entrance', 'LOBBY AGM Entrance')
# G.add_edge('AGM School Entrance', 'AGM CBE Office')
# G.add_edge('AGM CBE Office', 'AGM CAS Office')
# G.add_edge('AGM CAS Office', 'AGM 106 Counseling Office')
# G.add_edge('AGM Guidance Office', 'AGM Canteen')
# G.add_edge('AGM Guidance Office', 'AGM 106 Counseling Office')
# G.add_edge('AGM 107 Room', 'AGM Canteen')
# G.add_edge('AGM 107 Room', 'AGM Guidance Office')
# G.add_edge('AGM 1st Floor Stairs 1', 'AGM 2nd Floor Stairs 1')
# G.add_edge('AGM 2nd Floor Stairs 1', 'AGM ETEEAP Office')
# G.add_edge('AGM 2nd Floor Stairs 1', 'AGM Mass Communication Room')
# G.add_edge('AGM Canteen', 'AGM Guidance Office')

# G.add_edge('FGM AGM Entrance', 'AGM FGM Entrance')
# G.add_edge('FGM Library Entrance', 'FGM 1st Floor Stairs 1')
# G.add_edge('FGM Library Entrance', 'FGM 101 Male CR')
# G.add_edge('FGM Library Entrance', 'FGM 102 Faculty & Staff CR')
# G.add_edge('FGM Library Entrance', 'FGM 103 PWD CR')
# G.add_edge('FGM Library Entrance', 'FGM Registrar\'s Office')
# G.add_edge('FGM Finance Office', 'FGM Registrar\'s Office')
# G.add_edge('FGM Finance Office', 'FGM 1st Floor Elevator')
# G.add_edge('FGM Cashier', 'FGM 1st Floor Elevator')
# G.add_edge('FGM Cashier', 'FGM Academic Affairs Office')
# G.add_edge('FGM 107 Electrical Room', 'FGM Academic Affairs Office')
# G.add_edge('FGM 107 Electrical Room', 'FGM Conference Room')
# G.add_edge('FGM Conference Room', 'FGM REEDO')
# G.add_edge('FGM 1st Floor Stairs 2', 'FGM AGM Entrance')
# G.add_edge('FGM AGM Entrance', 'FGM REEDO')
# G.add_edge('FGM AGM Entrance', 'FGM 1st Floor Stairs 2')
# G.add_edge('FGM Pavement Entrance', 'FGM REEDO')
# G.add_edge('FGM Pavement Entrance', 'FGM 1st Floor Stairs 1')
# G.add_edge('FGM Pavement Entrance', 'FGM 1st Floor Stairs 2')
# G.add_edge('FGM Pavement Entrance', 'FGM 101 Male CR')
# G.add_edge('FGM Pavement Entrance', 'FGM 102 Faculty & Staff CR')
# G.add_edge('FGM Pavement Entrance', 'FGM 103 PWD CR')
# G.add_edge('FGM Pavement Entrance', 'FGM Registrar\'s Office')
# G.add_edge('FGM Admin Office', 'FGM 1st Floor Stairs 1')
# G.add_edge('FGM Admin Office', 'FGM 2nd Floor Stairs 1')
# G.add_edge('FGM 2nd Floor Stairs 2', 'FGM 1st Floor Stairs 2')
# G.add_edge('FGM 201 CR Men', 'FGM 2nd Floor Stairs 1')
# G.add_edge('FGM 201 CR Men', 'FGM Nursing Skills Lab 1')
# G.add_edge('FGM Nursing Skills Lab 1', 'FGM 2nd Floor Stairs 1')
# G.add_edge('FGM Nursing Skills Lab 1', 'FGM Nursing Skills Lab 2')
# G.add_edge('FGM 2nd Floor Elevator', 'FGM Nursing Skills Lab 2')
# G.add_edge('FGM 2nd Floor Elevator', 'FGM COAHS Dean\'s Office')
# G.add_edge('FGM Nursing Skills Lab 3', 'FGM COAHS Dean\'s Office')
# G.add_edge('FGM 2nd Floor Elevator', 'FGM Anatomy Lab')
# G.add_edge('FGM Nursing Skills Lab 2', 'FGM Anatomy Lab')
# G.add_edge('FGM (BSHM/BSTM/BSOA/REM) Simulation Room', 'FGM Anatomy Lab')
# G.add_edge('FGM (BSHM/BSTM/BSOA/REM) Simulation Room', 'FGM BSOA/BSHM/BSTM/BSREM Office')
# G.add_edge('FGM 209 Electrical Room', 'FGM BSOA/BSHM/BSTM/BSREM Office')
# G.add_edge('FGM Instrumentation Room and Pharma Lab Extension', 'FGM 209 Electrical Room')
# G.add_edge('FGM Instrumentation Room and Pharma Lab Extension', 'FGM Nursing Skills Lab 4')
# G.add_edge('FGM 2nd Floor Stairs 2', 'FGM Nursing Skills Lab 4')
# G.add_edge('FGM 2nd Floor Stairs 2', 'FGM 212 CR Women')
# G.add_edge('FGM Nursing Skills Lab 4', 'FGM 212 CR Women')
# G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 2nd Floor Stairs 2')
# G.add_edge('FGM 2nd Floor Stairs 1', 'FGM 3rd Floor Stairs 1')
# G.add_edge('FGM 3rd Floor Stairs 1', 'FGM 301 CR Men')
# G.add_edge('FGM 301 CR Men', 'FGM 302 Room')
# G.add_edge('FGM 3rd Floor Stairs 1', 'FGM 302 Room')
# G.add_edge('FGM 303 Room', 'FGM 302 Room')
# G.add_edge('FGM 303 Room', 'FGM 3rd Floor Elevator')
# G.add_edge('FGM Records Stock RoomFGM Stock Room', 'FGM 3rd Floor Elevator')
# G.add_edge('FGM Records Stock Room', 'FGM 306 Room')
# G.add_edge('FGM 307 Room', 'FGM 2nd Floor Elevator')
# G.add_edge('FGM 307 Room', 'FGM 303 Room')
# G.add_edge('FGM 307 Room', 'FGM 308 Room')
# G.add_edge('FGM 309 Room', 'FGM 308 Room')
# G.add_edge('FGM 309 Room', 'FGM 3rd Floor Electrical Room')
# G.add_edge('FGM 3rd Floor Electrical Room', 'FGM 308 Room')
# G.add_edge('FGM 3rd Floor Electrical Room', 'FGM 3rd Floor Counseling Room')
# G.add_edge('FGM 311 Room', 'FGM 3rd Floor Counseling Room')
# G.add_edge('FGM 312 Room', 'FGM 311 Room')
# G.add_edge('FGM 312 Room', 'FGM 313 CR Women')
# G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 313 CR Women')
# G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 312 Room')
# G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 4th Floor Stairs 2')
# G.add_edge('FGM 4th Floor Stairs 1', 'FGM 3rd Floor Stairs 1')
# G.add_edge('FGM 4th Floor Stairs 1', 'FGM 401 CR Men')
# G.add_edge('FGM 4th Floor Stairs 1', 'FGM 402 Room')
# G.add_edge('FGM 401 CR Men', 'FGM 402 Room')
# G.add_edge('FGM 403 Room', 'FGM 402 Room')
# G.add_edge('FGM 403 Room', 'FGM 4th Floor Elevator')
# G.add_edge('FGM 404 Room', 'FGM 4th Floor Elevator')
# G.add_edge('FGM 404 Room', 'FGM 405 Room')
# G.add_edge('FGM 406 Room', 'FGM 4th Floor Elevator')
# G.add_edge('FGM 406 Room', 'FGM 403 Room')
# G.add_edge('FGM 406 Room', 'FGM 407 Stock Room')
# G.add_edge('FGM 406 Room', 'FGM 408 Electrical Room')
# G.add_edge('FGM 407 Stock Room', 'FGM 408 Electrical Room')
# G.add_edge('FGM 409 Room', 'FGM 408 Electrical Room')
# G.add_edge('FGM 409 Room', 'FGM 410 Room')
# G.add_edge('FGM 411 CR Women', 'FGM 410 Room')
# G.add_edge('FGM 411 CR Women', 'FGM 4th Floor Stairs 2')
# G.add_edge('FGM 410 Room', 'FGM 4th Floor Stairs 2')
# G.add_edge('FGM 5th Floor Stairs 2', 'FGM 4th Floor Stairs 2')
# G.add_edge('FGM 5th Floor Stairs 1', 'FGM 4th Floor Stairs 1')
# G.add_edge('FGM 5th Floor Stairs 1', 'FGM 501 CR Men')
# G.add_edge('FGM 5th Floor Stairs 1', 'FGM 502 Criminology Lab')
# G.add_edge('FGM 501 CR Men', 'FGM 502 Criminology Lab')
# G.add_edge('FGM 503 Room', 'FGM 502 Criminology Lab')
# G.add_edge('FGM 503 Room', 'FGM 5th Floor Elevator')
# G.add_edge('FGM 5th Floor Elevator', 'FGM Interrogation Room')
# G.add_edge('FGM Interrogation Room', 'FGM Dark Room Forensic Photography')
# G.add_edge('FGM 507 Crime Scene Room', 'FGM Dark Room Forensic Photography')
# G.add_edge('FGM 507 Crime Scene Room', 'FGM Faculty Lounge')
# G.add_edge('FGM Court Room', 'FGM Faculty Lounge')
# G.add_edge('FGM Court Room', 'FGM 510 Room')
# G.add_edge('FGM 511 Electrical Room', 'FGM 510 Room')
# G.add_edge('FGM 512 Room', 'FGM 511 Electrical Room')
# G.add_edge('FGM 512 Room', 'FGM 513 Room')
# G.add_edge('FGM 514 CR Women', 'FGM 513 Room')
# G.add_edge('FGM 514 CR Women', 'FGM 5th Floor Stairs 2')
# G.add_edge('FGM 513 Room', 'FGM 5th Floor Stairs 2')
# G.add_edge('FGM 6th Floor Stairs 2', 'FGM 5th Floor Stairs 2')
# G.add_edge('FGM 6th Floor Stairs 1', 'FGM 5th Floor Stairs 1')
# G.add_edge('FGM 6th Floor Stairs 1', 'FGM 601 CR Men')
# G.add_edge('FGM 6th Floor Stairs 1', 'FGM 602 Room')
# G.add_edge('FGM 601 CR Men', 'FGM 602 Room')
# G.add_edge('FGM 603 Room', 'FGM 602 Room')
# G.add_edge('FGM 603 Room', 'FGM 6th Floor Elevator')
# G.add_edge('FGM 604 Room', 'FGM 6th Floor Elevator')
# G.add_edge('FGM 604 Room', 'FGM 605 Room')
# G.add_edge('FGM 606 Room', 'FGM 6th Floor Elevator')
# G.add_edge('FGM 606 Room', 'FGM 603 Room')
# G.add_edge('FGM 606 Room', 'FGM 607 Room')
# G.add_edge('FGM 608 Room', 'FGM 607 Room')
# G.add_edge('FGM 608 Room', 'FGM 609 Electrical Room')
# G.add_edge('FGM 607 Room', 'FGM 609 Electrical Room')
# G.add_edge('FGM 610 Room', 'FGM 609 Electrical Room')
# G.add_edge('FGM 610 Room', 'FGM 611 Room')
# G.add_edge('FGM 612 CR Women', 'FGM 611 Room')
# G.add_edge('FGM 612 CR Women', 'FGM 6th Floor Stairs 2')
# G.add_edge('FGM 611 Room', 'FGM 6th Floor Stairs 2')

# plt.figure(figsize=(24, 24),
# dpi=200)

# pos = nx.spring_layout(G, k=0.8, iterations=100, seed=42)

# nx.draw_networkx_edges(
#     G, pos,
#     alpha=0.15,
#     width=0.8,
#     edge_color="black"
# )

# nx.draw_networkx_nodes(
#     G, pos,
#     node_size=80,
#     node_color="skyblue",
#     linewidths=0
# )

# nx.draw_networkx_labels(
#     G, pos,
#     font_size=7
# )

# plt.axis("off")
# plt.tight_layout()
# plt.show()